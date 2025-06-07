'use server';
/**
 * @fileOverview Provides AI-driven fertilizer recommendations for farmers.
 *
 * - recommendFertilizers - A function that calls the AI flow to get fertilizer advice.
 * - FertilizerRecommendationInput - The input type for the fertilizer recommendation flow.
 * - FertilizerRecommendationOutput - The return type for the fertilizer recommendation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FertilizerRecommendationInputSchema = z.object({
  soilPH: z.number().min(0).max(14).describe('The pH level of the soil (e.g., 6.5).'),
  soilOrganicCarbonPercent: z.number().min(0).max(100).describe('The percentage of organic carbon in the soil (e.g., 0.7).'),
  soilNitrogenKgHa: z.number().min(0).describe('Available Nitrogen (N) in the soil in kg/ha (e.g., 250).'),
  soilPhosphorusKgHa: z.number().min(0).describe('Available Phosphorus (P) in the soil in kg/ha (e.g., 20).'),
  soilPotassiumKgHa: z.number().min(0).describe('Available Potassium (K) in the soil in kg/ha (e.g., 180).'),
  soilTexture: z.string().min(1).describe('The texture of the soil (e.g., "Loamy", "Sandy Clay", "Black Cotton Soil").'),
  cropName: z.string().min(1).describe('The name of the crop being cultivated (e.g., "Rice", "Cotton", "Tomato").'),
  currentSeason: z.enum(["Kharif", "Rabi", "Zaid", "Other"]).describe('The current growing season (e.g., "Kharif (June-Oct)", "Rabi (Nov-Mar)").'),
  waterAvailability: z.enum(["Abundant", "Moderate", "Scarce"]).describe('The general availability of water for irrigation (e.g., "Abundant (Canal/Borewell)", "Scarce (Rain-fed)").'),
  farmLocation: z.string().optional().describe('Optional: The general location of the farm (e.g., "Warangal, Telangana, India") for regional considerations.'),
});
export type FertilizerRecommendationInput = z.infer<typeof FertilizerRecommendationInputSchema>;

const RecommendedFertilizerSchema = z.object({
  nutrient: z.string().describe('The primary nutrient this recommendation is for (e.g., "Nitrogen (N)", "Phosphorus (P2O5)", "Potassium (K2O)", "Zinc (Zn)").'),
  fertilizerType: z.string().describe('The type or name of the fertilizer recommended (e.g., "Urea", "DAP", "Muriate of Potash", "Zinc Sulphate", "Organic Compost").'),
  applicationRate: z.string().describe('The recommended application rate (e.g., "100-120 kg/ha", "2 bags/acre", "As per soil test"). Include units.'),
  timing: z.string().describe('When to apply the fertilizer (e.g., "Basal dose at sowing", "Split application: 50% at planting, 50% at 30 DAS", "Top dressing during tillering stage").'),
  method: z.string().describe('Recommended application method (e.g., "Broadcasting and incorporation", "Band placement near roots", "Foliar spray").'),
});

const FertilizerRecommendationOutputSchema = z.object({
  recommendations: z.array(RecommendedFertilizerSchema).describe('A list of specific fertilizer recommendations for different nutrients.'),
  generalAdvice: z.string().describe('Overall advice, tips for soil health, or other considerations related to fertilizer application.'),
  warnings: z.string().optional().describe('Any specific warnings or precautions to take (e.g., "Avoid over-application of Urea to prevent lodging in wheat.").'),
});
export type FertilizerRecommendationOutput = z.infer<typeof FertilizerRecommendationOutputSchema>;

export async function recommendFertilizers(input: FertilizerRecommendationInput): Promise<FertilizerRecommendationOutput> {
  return fertilizerRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fertilizerRecommendationPrompt',
  input: {schema: FertilizerRecommendationInputSchema},
  output: {schema: FertilizerRecommendationOutputSchema},
  prompt: `You are an expert agronomist providing fertilizer recommendations to a farmer.
The farmer has provided the following details about their farm and crop:
- Soil pH: {{{soilPH}}}
- Soil Organic Carbon: {{{soilOrganicCarbonPercent}}}%
- Soil Available Nitrogen (N): {{{soilNitrogenKgHa}}} kg/ha
- Soil Available Phosphorus (P): {{{soilPhosphorusKgHa}}} kg/ha
- Soil Available Potassium (K): {{{soilPotassiumKgHa}}} kg/ha
- Soil Texture: {{{soilTexture}}}
- Crop Name: {{{cropName}}}
- Current Growing Season: {{{currentSeason}}}
- Water Availability: {{{waterAvailability}}}
{{#if farmLocation}}- Farm Location: {{{farmLocation}}}{{/if}}

Based on this information, provide specific fertilizer recommendations. Consider the nutrient requirements of the specified crop, the existing nutrient levels in the soil, the impact of the season on nutrient uptake and availability, and how water availability affects fertilizer choice and efficiency.

Your recommendations should include:
1.  Specific fertilizers for Nitrogen (N), Phosphorus (P), and Potassium (K). If micronutrient deficiencies are common for this crop/soil/location, suggest them too.
2.  For each fertilizer, specify the recommended type (e.g., Urea, DAP, MOP, organic options like compost if applicable), the application rate (e.g., in kg/ha or bags/acre), the timing of application (e.g., basal, top dressing at specific crop stages), and the application method.
3.  Provide general advice related to fertilizer application, soil health improvement (e.g., use of organic manures), and water management in relation to fertilization.
4.  Include any important warnings or precautions the farmer should be aware of.

Structure your output according to the 'FertilizerRecommendationOutput' schema.
Ensure 'recommendations' is an array of objects, each detailing a specific fertilizer for a nutrient.
'generalAdvice' should consolidate overall tips.
'warnings' should highlight critical precautions.
Focus on practical and actionable advice. If organic options are viable and effective, include them.
If soil nutrient levels are very high for a particular nutrient, you may recommend a reduced dose or no application for that nutrient.
Consider the crop's entire lifecycle for timing recommendations (e.g., split applications).
For application rates, if providing in bags/acre, assume standard bag weights if not specified (e.g. Urea/DAP 50kg bags).
If location is provided, consider general soil types or common deficiencies known for that region if possible, but prioritize the provided soil data.
`,
});

const fertilizerRecommendationFlow = ai.defineFlow(
  {
    name: 'fertilizerRecommendationFlow',
    inputSchema: FertilizerRecommendationInputSchema,
    outputSchema: FertilizerRecommendationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate fertilizer recommendations.");
    }
    return output;
  }
);
