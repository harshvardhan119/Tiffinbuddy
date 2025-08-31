
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { TiffinProvider } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this prototype, we'll throw an error if the key is missing.
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

// Ensure API_KEY is defined before initializing GoogleGenAI
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateMealPlanSuggestion = async (
    preferences: string,
    providers: TiffinProvider[]
): Promise<string> => {
    if (!ai) {
        return Promise.resolve(JSON.stringify({ 
            error: "Gemini API not configured. Please set the API_KEY environment variable." 
        }));
    }

    const providerInfo = providers.map(p => ({
        providerName: p.name,
        cuisine: p.cuisine,
        description: p.description,
        plans: p.plans.map(plan => ({
            planName: plan.name,
            price: plan.price,
            description: plan.description
        }))
    }));

    const prompt = `
    Based on the following user preferences and a list of available tiffin providers, create a personalized meal plan suggestion.

    User Preferences: "${preferences}"

    Available Tiffin Providers and their Plans:
    ${JSON.stringify(providerInfo, null, 2)}

    Your task is to analyze the user's preferences and the available options, then generate a response in JSON format. The response should recommend 1 to 3 tiffin plans that best match the user's needs.

    For each suggestion, provide the provider's name, the specific plan name, and a short, compelling reason why it's a good match. Also include a creative title for the overall suggested plan and a brief justification for your choices.
    `;
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        planTitle: {
                            type: Type.STRING,
                            description: "A creative and appealing title for the suggested meal plan."
                        },
                        justification: {
                            type: Type.STRING,
                            description: "A brief, overall justification for the selections, highlighting how they meet the user's preferences."
                        },
                        suggestedTiffins: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    providerName: { type: Type.STRING },
                                    planName: { type: Type.STRING },
                                    reason: { type: Type.STRING, description: "A short, compelling reason why this specific plan is a great choice." }
                                }
                            }
                        }
                    }
                }
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return JSON.stringify({ 
            error: "Failed to generate meal plan suggestion. Please try again later."
        });
    }
};
