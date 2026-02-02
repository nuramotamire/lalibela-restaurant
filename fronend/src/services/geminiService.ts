
import { GoogleGenAI } from "@google/genai";

/* Corrected initialization to use named parameter for apiKey as per guidelines */
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Sebastian", the AI Concierge for Lalibela Restaurant, a premier authentic Ethiopian dining destination.
Your tone is sophisticated, welcoming, and knowledgeable about Habesha culture.
Lalibela is known for:
- Authentic Ethiopian Cuisine: Wats, Injera, and Gomen.
- Modern Interactive Experience: Guests can choose their specific table (Window, Main Floor, or Upstairs).
- Atmosphere: A blend of ancient tradition and contemporary design.
- Hours: Mon-Fri 5:00 PM - 11:00 PM, Sat-Sun 12:00 PM - 11:00 PM.
- Speciality: Traditional Coffee Ceremonies and signature Honey Wine (Tej).

Your goal is to answer guest questions about the menu or seating options. 
Keep answers elegant and concise.
Always invite them to use our interactive booking tool if they want to choose a specific seat.
`;

export const sendMessageToConcierge = async (
  message: string, 
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    /* Using recommended model 'gemini-3-flash-preview' for general text tasks */
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role === 'model' ? 'model' : 'user',
        parts: [{ text: h.text }]
      }))
    });

    /* Correct extraction of text from GenerateContentResponse using .text property */
    const result = await chat.sendMessage({ message });
    return result.text || "I apologize, but I could not formulate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, I am having trouble processing your request at the moment.";
  }
};
