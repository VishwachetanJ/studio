
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

// Input schema remains internal to this file for use by the flow.
// The page component will define its own Zod schema for client-side form validation
// but will use the exported FertilizerRecommendationInput type.
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
  farmSizeAcres: z.number().min(0).optional().describe('Optional: The size of the farm in acres. This helps contextualize the scale but specific unit conversions for guntas, cents etc. need to be done by the farmer based on the per acre/hectare rates provided.'),
});
export type FertilizerRecommendationInput = z.infer<typeof FertilizerRecommendationInputSchema>;

const RecommendedFertilizerSchema = z.object({
  nutrient: z.string().describe('The primary nutrient this recommendation is for (e.g., "Nitrogen (N)", "Phosphorus (P2O5)", "Potassium (K2O)", "Zinc (Zn)").'),
  fertilizerType: z.string().describe('The type or name of the fertilizer recommended (e.g., "Urea", "DAP", "Muriate of Potash", "Zinc Sulphate", "Organic Compost").'),
  applicationRate: z.string().describe('The recommended application rate (e.g., "100-120 kg/ha", "2 bags/acre", "As per soil test"). Clearly state the unit (e.g., per hectare, per acre). Farmer needs to scale this to their specific land area in local units like guntas or cents.'),
  timing: z.string().describe('When to apply the fertilizer (e.g., "Basal dose at sowing", "Split application: 50% at planting, 50% at 30 DAS", "Top dressing during tillering stage").'),
  method: z.string().describe('Recommended application method (e.g., "Broadcasting and incorporation", "Band placement near roots", "Foliar spray").'),
});

// Output schema is internal, but its inferred type is exported.
const FertilizerRecommendationOutputSchema = z.object({
  recommendations: z.array(RecommendedFertilizerSchema).describe('A list of specific fertilizer recommendations for different nutrients.'),
  generalAdvice: z.string().describe('Overall advice, tips for soil health, or other considerations related to fertilizer application.'),
  warnings: z.string().optional().describe('Any specific warnings or precautions to take (e.g., "Avoid over-application of Urea to prevent lodging in wheat.").'),
  suggestedVideoTopics: z.array(z.string()).describe('A list of suggested topics for educational videos relevant to the crop, soil conditions, and fertilizer practices (e.g., "How to apply Urea efficiently for Rice in Loamy soil"). Be specific.'),
  keyPracticeMethods: z.array(z.string()).describe('A list of key agricultural practice methods to consider for optimal yield and soil health, related to the inputs (e.g., "Importance of split application of Nitrogen for Cotton", "Soil moisture conservation for Zaid crops"). Be specific.'),
});
export type FertilizerRecommendationOutput = z.infer<typeof FertilizerRecommendationOutputSchema>;

export async function recommendFertilizers(input: FertilizerRecommendationInput): Promise<FertilizerRecommendationOutput> {
  return fertilizerRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fertilizerRecommendationPrompt',
  input: {schema: FertilizerRecommendationInputSchema},
  output: {schema: FertilizerRecommendationOutputSchema},
  prompt: `You are an expert agronomist providing fertilizer recommendations and related agricultural advice to a farmer.
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
{{#if farmSizeAcres}}- Farm Size: Approximately {{{farmSizeAcres}}} acres. (Note: Your application rates should be per standard unit like hectare or acre, and the farmer will need to scale this to their specific area in local units like guntas or cents).{{/if}}

Based on this information:
1.  Provide specific fertilizer recommendations. Consider the nutrient requirements of the specified crop, existing soil nutrient levels, season, and water availability.
    - Detail type, application rate (clearly stating units like kg/ha or bags/acre), timing, and method for each recommended fertilizer. Emphasize that the farmer must calculate the exact amount for their specific land area based on this rate.
    - Include micronutrients if commonly needed.
2.  Offer general advice for fertilizer application, soil health improvement (e.g., organic manures), and water management.
3.  List any important warnings or precautions.
4.  Suggest specific topics for educational videos relevant to the farmer's situation (crop, soil, water, season). These topics should help the farmer understand best practices related to the recommendations. For example: "Video on benefits of balanced fertilization for [Crop Name] in [Soil Texture]" or "Applying [Fertilizer Type] in [Current Season] for [Crop Name]". Be specific and actionable.
5.  Outline key agricultural practice methods that would be beneficial. These should be practical tips directly related to the inputs and recommendations. For example: "Techniques for improving [Nutrient] uptake in [Soil Texture] soils" or "Best water management for [Crop Name] during [Current Season] with [Water Availability] water". Be specific.

Structure your output according to the 'FertilizerRecommendationOutput' schema.
Ensure 'recommendations' is an array of objects. Ensure 'applicationRate' clearly specifies its unit (e.g., "X kg/ha" or "Y bags/acre") and includes a note about farmer needing to scale it.
'suggestedVideoTopics' should be an array of specific video topic suggestions.
'keyPracticeMethods' should be an array of specific, actionable practice method suggestions.
Focus on practical advice. If organic options are viable, include them.
If soil nutrient levels are very high, recommend reduced or no application for that nutrient.
Consider the crop's entire lifecycle for timing.
If location is provided, consider regional factors if possible, but prioritize provided soil data.
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

    