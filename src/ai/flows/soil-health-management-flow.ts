
'use server';
/**
 * @fileOverview Provides AI-driven soil health management recommendations.
 *
 * - recommendSoilHealthPractices - A function that calls the AI flow to get soil health advice.
 * - SoilHealthRecommendationInput - The input type for the soil health recommendation flow.
 * - SoilHealthRecommendationOutput - The return type for the soil health recommendation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SoilHealthRecommendationInputSchema = z.object({
  cropName: z.string().min(1).describe('The name of the crop being cultivated or planned (e.g., "Maize", "Cotton", "Groundnut").'),
  soilType: z.string().min(1).describe('The predominant texture or type of the soil (e.g., "Sandy Loam", "Clayey", "Red Lateritic Soil").'),
  cropStage: z.enum(["Pre-Planting", "Active Growth", "Post-Harvest", "Fallow Period"]).describe('The current or relevant stage of the crop cycle.'),
  specificConcerns: z.string().optional().describe('Optional: Any specific soil health concerns (e.g., "Soil compaction", "Low organic matter", "Water erosion", "Salinity issues").'),
  waterAvailability: z.enum(["Abundant", "Moderate", "Scarce"]).describe('General water availability for the farm, as it influences certain soil practices.'),
  farmLocation: z.string().optional().describe('Optional: The general location of the farm for regional considerations.'),
});
export type SoilHealthRecommendationInput = z.infer<typeof SoilHealthRecommendationInputSchema>;

const TechniqueSchema = z.object({
  techniqueName: z.string().describe("Name of the soil health technique (e.g., 'Green Manuring', 'Straw Mulching', 'Zero Tillage')."),
  description: z.string().describe("Brief explanation of the technique and its benefits for the given crop/soil/stage."),
  implementationDetails: z.string().describe("Key steps or considerations for implementing the technique effectively."),
  relevance: z.string().describe("Why this technique is particularly relevant for the specified crop, soil, and stage."),
});

const SoilHealthRecommendationOutputSchema = z.object({
  preCultivationTechniques: z.array(TechniqueSchema).describe('Soil health techniques recommended before planting the crop.'),
  duringCropTechniques: z.array(TechniqueSchema).describe('Soil health techniques recommended during the active growth phase of the crop, including practices like mulching or intercropping.'),
  postCultivationTechniques: z.array(TechniqueSchema).describe('Soil health techniques recommended after harvesting the crop or during fallow periods.'),
  generalSoilHealthAdvice: z.string().describe('Overall advice for long-term soil health improvement and maintenance relevant to the inputs.'),
  warnings: z.string().optional().describe('Any specific warnings or precautions related to the recommended soil health practices (e.g., "Avoid excessive tillage in sandy soils to prevent organic matter loss.").'),
  suggestedVideoTopics: z.array(z.string()).describe('A list of suggested topics for educational videos relevant to soil health for the given crop, soil, and stage.'),
  keyPracticeMethods: z.array(z.string()).describe('A list of key agricultural practice methods to consider for optimal soil health and productivity.'),
});
export type SoilHealthRecommendationOutput = z.infer<typeof SoilHealthRecommendationOutputSchema>;


export async function recommendSoilHealthPractices(input: SoilHealthRecommendationInput): Promise<SoilHealthRecommendationOutput> {
  return soilHealthManagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'soilHealthRecommendationPrompt',
  input: {schema: SoilHealthRecommendationInputSchema},
  output: {schema: SoilHealthRecommendationOutputSchema},
  prompt: `You are an expert soil scientist and agronomist providing detailed soil health management advice.
The farmer has provided the following details:
- Crop Name: {{{cropName}}}
- Soil Type: {{{soilType}}}
- Crop Stage: {{{cropStage}}}
- Water Availability: {{{waterAvailability}}}
{{#if specificConcerns}}- Specific Soil Health Concerns: {{{specificConcerns}}}{{/if}}
{{#if farmLocation}}- Farm Location: {{{farmLocation}}}{{/if}}

Based on this information, provide comprehensive soil health recommendations:
1.  **Pre-Cultivation Techniques**: Detail specific soil preparation and improvement techniques suitable before planting the '{{cropName}}' in '{{soilType}}' soil. Consider the '{{waterAvailability}}' and any '{{specificConcerns}}'.
    - For each technique: provide Name, Description, Implementation Details, and Relevance.
2.  **During-Crop Techniques**: Recommend practices for maintaining and enhancing soil health while '{{cropName}}' is actively growing. This must include advice on mulching, intercropping, or other relevant in-season practices for '{{soilType}}' and '{{waterAvailability}}'.
    - For each technique: provide Name, Description, Implementation Details, and Relevance.
3.  **Post-Cultivation Techniques**: Advise on soil management practices after harvesting '{{cropName}}' or during fallow periods, suitable for '{{soilType}}'.
    - For each technique: provide Name, Description, Implementation Details, and Relevance.
4.  **General Soil Health Advice**: Offer overall, long-term strategies for improving and sustaining soil health given the context.
5.  **Warnings**: If applicable, list any specific warnings or precautions.
6.  **Suggested Video Topics**: Propose specific topics for educational videos focused on soil health for '{{cropName}}' in '{{soilType}}' under '{{waterAvailability}}' conditions. Be actionable and specific.
7.  **Key Practice Methods**: Outline key overarching agricultural practice methods beneficial for soil health in this scenario. Be actionable and specific.

Structure your output according to the 'SoilHealthRecommendationOutput' schema. Ensure technique lists are arrays of objects.
Prioritize practices that are sustainable and, where feasible, cost-effective.
If 'specificConcerns' are mentioned, try to address them directly in your recommendations.
The advice should be practical and actionable for a farmer.
`,
});

const soilHealthManagementFlow = ai.defineFlow(
  {
    name: 'soilHealthManagementFlow',
    inputSchema: SoilHealthRecommendationInputSchema,
    outputSchema: SoilHealthRecommendationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate soil health management recommendations.");
    }
    return output;
  }
);

