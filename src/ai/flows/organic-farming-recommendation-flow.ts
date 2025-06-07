
'use server';
/**
 * @fileOverview Provides AI-driven organic farming recommendations.
 *
 * - recommendOrganicPractices - A function that calls the AI flow to get organic farming advice.
 * - OrganicRecommendationInput - The input type for the organic farming recommendation flow.
 * - OrganicRecommendationOutput - The return type for the organic farming recommendation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OrganicRecommendationInputSchema = z.object({
  cropName: z.string().min(1).describe('The name of the crop being cultivated (e.g., "Tomato", "Spinach", "Wheat").'),
  soilType: z.string().min(1).describe('The texture or type of the soil (e.g., "Loamy", "Sandy Clay", "Alluvial").'),
  soilOrganicMatterPercent: z.number().min(0).max(100).optional().describe('Optional: The percentage of organic matter in the soil (e.g., 1.5).'),
  currentSeason: z.enum(["Kharif", "Rabi", "Zaid", "Other"]).describe('The current growing season.'),
  waterAvailability: z.enum(["Abundant", "Moderate", "Scarce"]).describe('The general availability of water for irrigation.'),
  specificChallenges: z.string().optional().describe('Optional: Any specific challenges faced (e.g., "High pest pressure for aphids", "Low soil fertility", "Weed control issues").'),
  farmLocation: z.string().optional().describe('Optional: The general location of the farm for regional considerations.'),
});
export type OrganicRecommendationInput = z.infer<typeof OrganicRecommendationInputSchema>;

const OrganicInputRecommendationSchema = z.object({
  inputType: z.string().describe('Category of input (e.g., "Soil Amendment", "Bio-fertilizer", "Green Manure").'),
  inputName: z.string().describe('Specific name of the organic input (e.g., "Vermicompost", "Neem Cake", "Azospirillum", "Sunn Hemp").'),
  applicationRate: z.string().describe('Recommended application rate (e.g., "5-10 tons/ha", "200 kg/acre", "As per soil test"). Include units.'),
  timing: z.string().describe('When to apply (e.g., "During land preparation", "At sowing", "Top dressing at 30 DAS").'),
  method: z.string().describe('Recommended application method (e.g., "Incorporate into soil", "Seed treatment", "Foliar spray").'),
  benefits: z.string().describe('Key benefits of using this input for the specified crop and soil.'),
});

const OrganicPestDiseaseControlSchema = z.object({
  problemType: z.string().describe('Type of problem (e.g., "Aphids", "Whiteflies", "Fungal Blight", "Nematodes").'),
  organicSolution: z.string().describe('Name of the organic control method or product (e.g., "Neem Oil Spray", "Beauveria Bassiana", "Trichoderma Viride", "Crop Rotation").'),
  preparationAndApplication: z.string().describe('How to prepare (if applicable) and apply the solution.'),
  timingOrFrequency: z.string().describe('When or how often to apply (e.g., "On first sign of infestation", "Weekly preventative spray", "During specific crop stage").'),
});

const OrganicRecommendationOutputSchema = z.object({
  organicInputRecommendations: z.array(OrganicInputRecommendationSchema).describe('Specific recommendations for organic inputs like compost, bio-fertilizers, green manures, etc.'),
  pestAndDiseaseManagement: z.array(OrganicPestDiseaseControlSchema).describe('Organic methods for managing common pests and diseases for the specified crop.'),
  soilHealthImprovementPractices: z.array(z.string()).describe('List of key organic practices to improve soil health (e.g., "Cover cropping with legumes", "Mulching with straw", "Reduced tillage").'),
  generalAdvice: z.string().describe('Overall advice for successful organic farming of the specified crop, including considerations for certification if relevant.'),
  warnings: z.string().optional().describe('Any specific warnings or precautions for organic farming (e.g., "Ensure compost is fully decomposed before application.").'),
  suggestedVideoTopics: z.array(z.string()).describe('A list of suggested topics for educational videos relevant to organic farming of the crop and soil conditions.'),
  keyPracticeMethods: z.array(z.string()).describe('A list of key organic agricultural practice methods to consider for optimal yield and soil health.'),
});
export type OrganicRecommendationOutput = z.infer<typeof OrganicRecommendationOutputSchema>;


export async function recommendOrganicPractices(input: OrganicRecommendationInput): Promise<OrganicRecommendationOutput> {
  return organicRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'organicRecommendationPrompt',
  input: {schema: OrganicRecommendationInputSchema},
  output: {schema: OrganicRecommendationOutputSchema},
  prompt: `You are an expert in organic agriculture, providing advice to a farmer.
The farmer has provided the following details:
- Crop Name: {{{cropName}}}
- Soil Type: {{{soilType}}}
{{#if soilOrganicMatterPercent}}- Soil Organic Matter: {{{soilOrganicMatterPercent}}}%{{/if}}
- Current Growing Season: {{{currentSeason}}}
- Water Availability: {{{waterAvailability}}}
{{#if specificChallenges}}- Specific Challenges: {{{specificChallenges}}}{{/if}}
{{#if farmLocation}}- Farm Location: {{{farmLocation}}}{{/if}}

Based on this information:
1.  Provide specific recommendations for organic inputs (e.g., compost, vermicompost, bio-fertilizers, green manures, oil cakes). For each, detail:
    - Input Type (category)
    - Input Name (specific)
    - Application Rate (with units)
    - Timing of application
    - Method of application
    - Key benefits for this crop/soil.
2.  Suggest organic methods for pest and disease management relevant to the crop. For each suggestion, include:
    - Problem Type (e.g., specific pest or disease)
    - Organic Solution (name of method/product)
    - Preparation and Application details
    - Timing or Frequency of application.
3.  List key organic practices to improve and maintain soil health.
4.  Offer general advice for successful organic farming of this crop, including any notes on organic certification if relevant.
5.  List any important warnings or precautions for organic practices.
6.  Suggest specific topics for educational videos focused on organic farming for the given crop and soil. (e.g., "How to make vermicompost for [Crop Name] in [Soil Type]", "Organic pest control for [Pest Name] in [Crop Name]"). Be specific and actionable.
7.  Outline key organic agricultural practice methods that would be beneficial. (e.g., "Intercropping [Crop Name] with [Companion Plant] for soil fertility", "Water conservation techniques for organic [Crop Name] in [Water Availability] conditions"). Be specific.

Structure your output according to the 'OrganicRecommendationOutput' schema.
Ensure 'organicInputRecommendations' and 'pestAndDiseaseManagement' are arrays of objects.
'suggestedVideoTopics' and 'keyPracticeMethods' should be arrays of specific, actionable suggestions.
Prioritize locally available and cost-effective organic solutions where possible.
If specific challenges are mentioned, try to address them directly in your recommendations.
`,
});

const organicRecommendationFlow = ai.defineFlow(
  {
    name: 'organicRecommendationFlow',
    inputSchema: OrganicRecommendationInputSchema,
    outputSchema: OrganicRecommendationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate organic farming recommendations.");
    }
    return output;
  }
);
