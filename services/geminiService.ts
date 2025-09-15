import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    refinedContent: {
      type: Type.STRING,
      description: "The refined, improved version of the original text, written in a clear and professional tone.",
    },
    generatedQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 5 insightful questions that can be answered from the provided text, to stimulate discussion.",
    },
    glossary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          term: {
            type: Type.STRING,
            description: "A key technical term from the text."
          },
          definition: {
            type: Type.STRING,
            description: "A simple, easy-to-understand definition for the term."
          },
        },
        required: ["term", "definition"],
      },
      description: "A list of key terms and their definitions.",
    },
    userAnswers: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { 
            type: Type.STRING,
            description: "The original question asked by the user."
          },
          answer: { 
            type: Type.STRING,
            description: "A clear and concise answer to the user's question, based only on the provided text."
          },
        },
        required: ["question", "answer"],
      },
      description: "Answers to the user's specific questions.",
    },
    energyFlows: {
        type: Type.STRING,
        description: "Mermaid.js 'graph TD' syntax for two separate flowcharts: one for 2025 and one for 2030. Visualize the energy flow from 'Renewable Capacity' to 'Demand', splitting into 'Energy Used' and 'Potential Surplus', with the surplus leading to 'Curtailment'. Use data from the text like '~31,000 TWh Demand' and '~40,000 TWh Capacity' for 2025. The entire output for both charts must be a single string, with each chart clearly titled.",
    },
    chartData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The year, e.g., '2025' or '2030'." },
          Demand: { type: Type.NUMBER, description: "Global Demand in TWh for that year." },
          Capacity: { type: Type.NUMBER, description: "Renewable Capacity in TWh for that year." },
          Surplus: { type: Type.NUMBER, description: "Potential Surplus in TWh for that year." },
        },
        required: ["name", "Demand", "Capacity", "Surplus"],
      },
      description: "Structured data for a bar chart comparing energy metrics for 2025 and 2030.",
    },
  },
  required: ["refinedContent", "generatedQuestions", "glossary", "userAnswers", "energyFlows", "chartData"],
};

export const analyzeContent = async (text: string): Promise<AnalysisResult> => {
  const prompt = `
    Analyze the following text and perform six tasks. Structure your entire response as a single JSON object matching the provided schema.

    TEXT TO ANALYZE:
    ---
    ${text}
    ---

    TASKS:
    1.  **Refine Content**: Rewrite the text to be clearer, more concise, and well-structured. Correct any grammatical errors. The tone should be informative and professional. Maintain the original language of the text.
    2.  **Generate Questions**: Create a list of 5 insightful questions that can be answered from the provided text, to stimulate discussion.
    3.  **Create Glossary**: Identify key technical terms and create a glossary. For each term, provide a simple, easy-to-understand definition in the same language as the text.
    4.  **Answer Specific Questions**: Provide clear and concise answers to the following specific questions based *only* on the provided text. If the text does not contain enough information to answer a question, state that clearly.
        - Question 1: explique o curtailment para um idiota (explain curtailment for an idiot).
        - Question 2: quanto terremos de excedente energetico renovavel ate 2030 (how much renewable energy surplus will we have by 2030).
        - Question 3: quanto podera ser interligado globalmente? (how much can be interconnected globally?).
    5.  **Generate Energy Flowcharts**: Create Mermaid.js graph syntax for two separate flowcharts (one for 2025, one for 2030) that visualize the energy flow from generation to potential surplus and curtailment, based on the data in the text. Use 'graph TD' direction. The syntax for both charts should be in a single string, separated by a newline and each with a title.
    6.  **Generate Chart Data**: Extract the data for "Demanda Global", "Capacidade Renovável", and "Excedente Potencial" for the years 2025 and 2030. Format this into a JSON array for a bar chart. Example: [{ "name": "2025", "Demand": 31000, "Capacity": 40000, "Surplus": 9000 }, ...]. Use the numeric values from the text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });
    
    const jsonString = response.text.trim();
    const parsedResult = JSON.parse(jsonString);

    // Basic validation to ensure the result matches the expected structure
    if (
      !parsedResult.refinedContent ||
      !Array.isArray(parsedResult.generatedQuestions) ||
      !Array.isArray(parsedResult.glossary) ||
      !Array.isArray(parsedResult.userAnswers) ||
      typeof parsedResult.energyFlows !== 'string' ||
      !Array.isArray(parsedResult.chartData)
    ) {
      throw new Error("API response does not match the expected format.");
    }

    return parsedResult as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing content with Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI. Please try again.");
  }
};