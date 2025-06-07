
'use server';
/**
 * @fileOverview Provides AI-driven recommendations for safe and effective pesticide use, prioritizing Integrated Pest Management (IPM).
 *
 * - recommendPesticideOrAlternatives - A function that calls the AI flow to get pest/disease management advice.
 * - PesticideRecommendationInput - The input type for the flow.
 * - PesticideRecommendationOutput - The return type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PesticideRecommendationInputSchema = z.object({
  cropName: z.string().min(1).describe('The name of the crop affected (e.g., "Cotton", "Tomato", "Rice").'),
  soilType: z.string().min(1).describe('The predominant soil type where the crop is grown (e.g., "Black Cotton Soil", "Red Loam", "Sandy").'),
  pestOrDiseaseName: z.string().min(1).describe('The specific name of the pest (e.g., "Aphids", "Bollworm") or disease (e.g., "Powdery Mildew", "Bacterial Blight") identified. If unknown, describe symptoms.'),
  symptomsObserved: z.string().min(10).describe('Detailed description of symptoms observed on the crop (e.g., "Yellowing leaves with sticky residue", "Holes in fruits", "White powdery spots on leaves").'),
  infestationSeverity: z.enum(["Low", "Moderate", "High", "Very High"]).describe('The perceived severity of the pest infestation or disease infection.'),
  previousPesticideUsage: z.string().optional().describe('Optional: Details of any pesticides used recently for this issue, including name and frequency.'),
  farmLocation: z.string().optional().describe('Optional: The general location of the farm for regional pest/disease considerations.'),
  farmSizeAcres: z.number().min(0).optional().describe('Optional: The size of the affected area in acres. This helps contextualize the scale, but specific unit conversions (e.g., for guntas, cents) need to be done by the farmer based on the per acre/hectare rates provided.'),
});
export type PesticideRecommendationInput = z.infer<typeof PesticideRecommendationInputSchema>;

const NonPesticideMethodSchema = z.object({
  methodName: z.string().describe("Name of the non-pesticide control method (e.g., 'Neem Oil Spray', 'Introduction of Ladybugs', 'Crop Rotation', 'Handpicking Pests')."),
  description: z.string().describe("How to implement this method."),
  effectiveness: z.string().describe("Expected effectiveness and when to use it."),
});

const RecommendedPesticideSchema = z.object({
  pesticideName: z.string().describe("Chemical or trade name of the recommended pesticide."),
  activeIngredient: z.string().describe("The main active ingredient of the pesticide."),
  dosage: z.string().describe("Recommended dosage. Clearly state the unit (e.g., ml/liter, kg/hectare, ml/acre). Farmer needs to scale this to their specific land area in local units like guntas or cents."),
  applicationTiming: z.string().describe("Best time or crop stage for application."),
  applicationMethod: z.string().describe("How to apply (e.g., 'Foliar spray', 'Soil drench')."),
  waitingPeriod: z.string().optional().describe("Pre-harvest interval or re-entry period after application, if applicable."),
});

const PesticideRecommendationOutputSchema = z.object({
  assessment: z.string().describe("Overall assessment of the situation and whether chemical pesticides are immediately warranted or if alternatives should be prioritized."),
  nonPesticideRecommendations: z.array(NonPesticideMethodSchema).describe("Specific non-pesticide control methods, if applicable. This should be the first line of defense if appropriate."),
  pesticideRecommendations: z.array(RecommendedPesticideSchema).describe("Specific pesticide recommendations, if deemed necessary. Focus on safer, effective options."),
  safetyPrecautions: z.array(z.string()).describe("Essential safety precautions to take if applying pesticides (e.g., 'Wear PPE: gloves, mask, goggles', 'Avoid spraying during windy conditions', 'Store pesticides safely away from children and food')."),
  environmentalConsiderations: z.array(z.string()).optional().describe("Any environmental considerations, like impact on beneficial insects or water bodies."),
  suggestedVideoTopics: z.array(z.string()).describe('A list of suggested topics for educational videos relevant to the pest/disease and its management.'),
  keyPracticeMethods: z.array(z.string()).describe('A list of key agricultural practice methods to consider for long-term pest/disease management.'),
});
export type PesticideRecommendationOutput = z.infer<typeof PesticideRecommendationOutputSchema>;


export async function recommendPesticideOrAlternatives(input: PesticideRecommendationInput): Promise<PesticideRecommendationOutput> {
  return pesticideRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pesticideRecommendationPrompt',
  input: {schema: PesticideRecommendationInputSchema},
  output: {schema: PesticideRecommendationOutputSchema},
  prompt: `You are an expert in Integrated Pest Management (IPM) and plant protection, advising a farmer.
The farmer provides the following details:
- Crop: {{{cropName}}}
- Soil Type: {{{soilType}}}
- Pest/Disease: {{{pestOrDiseaseName}}}
- Symptoms: {{{symptomsObserved}}}
- Severity: {{{infestationSeverity}}}
{{#if previousPesticideUsage}}- Previous Pesticide Use: {{{previousPesticideUsage}}}{{/if}}
{{#if farmLocation}}- Farm Location: {{{farmLocation}}}{{/if}}
{{#if farmSizeAcres}}- Affected Area Size: Approximately {{{farmSizeAcres}}} acres. (Note: Your dosage recommendations should be per standard unit like per liter for sprays, or per hectare/acre for soil applications. The farmer will need to scale this to their specific area in local units like guntas or cents).{{/if}}

Based on this information, provide comprehensive advice:
1.  **Assessment**: Start with an overall assessment. Should the farmer prioritize non-pesticide methods, or is chemical intervention likely necessary given the severity?
2.  **Non-Pesticide Recommendations**: If applicable, detail specific non-pesticide methods first. For each:
    - Method Name
    - Description (how to implement)
    - Effectiveness (when/how it helps)
    Examples: Cultural practices (crop rotation, sanitation), biological controls (beneficial insects), physical/mechanical controls (traps, handpicking), or botanical pesticides (neem oil, etc.).
3.  **Pesticide Recommendations**: If chemical pesticides are warranted (or as a later option if non-pesticide methods are insufficient):
    - Recommend specific, effective pesticides. Prioritize options with lower toxicity and environmental impact where possible.
    - For each pesticide: Name, Active Ingredient, Dosage (clearly state units like ml/liter, kg/ha, or ml/acre, and note farmer must scale), Application Timing, Application Method, and Waiting Period (if applicable).
4.  **Safety Precautions**: Crucially, list essential safety precautions for pesticide application (e.g., PPE, handling, storage, disposal).
5.  **Environmental Considerations**: Optionally, note any environmental concerns (e.g., impact on bees, runoff risks).
6.  **Suggested Video Topics**: Provide specific, actionable video topic suggestions relevant to identifying and managing the specified pest/disease on the crop. (e.g., "How to spot early signs of Powdery Mildew on Tomatoes", "Making and using Neem spray for Aphids").
7.  **Key Practice Methods**: Outline broader agricultural practices that contribute to long-term pest/disease resilience for this crop and situation. (e.g., "Importance of field sanitation after Cotton harvest to reduce Bollworm carryover", "Using resistant varieties for [Crop Name] against [Disease Name]").

Structure your output according to the 'PesticideRecommendationOutput' schema. Ensure 'dosage' clearly specifies its unit and includes a note about farmer needing to scale it.
Emphasize IPM principles: monitor, identify, assess, then choose the least harmful effective control.
If 'pestOrDiseaseName' seems vague but 'symptomsObserved' are clear, make a probable identification to guide advice.
If severity is 'Low', strongly favor non-pesticide options.
Consider the crop stage implied by the problem if not explicitly stated.
`,
});

const pesticideRecommendationFlow = ai.defineFlow(
  {
    name: 'pesticideRecommendationFlow',
    inputSchema: PesticideRecommendationInputSchema,
    outputSchema: PesticideRecommendationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate pesticide or alternative recommendations.");
    }
    return output;
  }
);

    