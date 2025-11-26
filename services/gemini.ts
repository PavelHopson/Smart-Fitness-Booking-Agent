import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { Message, MessageRole } from "../types";

// --- Tool Definitions ---

const getScheduleTool: FunctionDeclaration = {
  name: 'get_schedule',
  description: 'Get the fitness class schedule for a specific date. Always ask for the date if not provided.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      date: {
        type: Type.STRING,
        description: 'Date in YYYY-MM-DD format. If user says "tomorrow", calculate the date.',
      },
    },
    required: ['date'],
  },
};

const bookSlotTool: FunctionDeclaration = {
  name: 'book_slot',
  description: 'Book a specific training slot by ID. Must be called after checking availability.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      slotId: {
        type: Type.STRING,
        description: 'The ID of the slot to book (e.g., "2023-10-25-0900")',
      },
      clientName: {
        type: Type.STRING,
        description: 'Name of the client booking the class',
      },
    },
    required: ['slotId', 'clientName'],
  },
};

export const tools = [getScheduleTool, bookSlotTool];

// --- Service Logic ---

let client: GoogleGenAI | null = null;

export const initializeGemini = (apiKey: string) => {
  client = new GoogleGenAI({ apiKey });
};

export const sendMessageToAgent = async (
  history: Message[],
  newMessage: string,
  toolImpls: {
    get_schedule: (args: any) => Promise<any>;
    book_slot: (args: any) => Promise<any>;
  }
): Promise<{ text: string; toolCalls?: any[] }> => {
  if (!client) throw new Error("API Key not set");

  // Filter history to only include user and model messages for the API context
  // Also, we need to be careful with tool messages in a real production app, 
  // but for this demo, we'll keep the context window short or just send text representation.
  // A robust implementation would map our `Message` type strictly to Gemini's `Content`.
  
  const systemInstruction = `
    You are 'IronBot', a specialized fitness booking assistant.
    Your tone is professional, energetic, and efficient.
    
    Current Date: ${new Date().toISOString().split('T')[0]} (YYYY-MM-DD).
    
    Protocol:
    1. If user asks for schedule, use 'get_schedule'. Convert terms like 'tomorrow' to YYYY-MM-DD.
    2. Display available slots in a readable list with IDs.
    3. If user wants to book, ask for their name (if not known) and confirm the slot ID, then use 'book_slot'.
    4. Handle errors gracefully.
    
    Don't be verbose. Be precise.
  `;

  // Construct chat history for the model
  // Note: simplified for this demo. In a real app, we'd preserve the FunctionCall/FunctionResponse objects strictly.
  let prompt = "";
  if(history.length > 0) {
      prompt += "History:\n" + history.map(h => `${h.role}: ${h.text}`).join("\n") + "\n";
  }
  prompt += `User: ${newMessage}`;

  const model = client.models;

  // 1. First Turn: Send message to model with tools
  const result = await model.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      tools: [{ functionDeclarations: tools }],
    }
  });

  const response = result.candidates?.[0]?.content?.parts?.[0];
  
  if (!response) return { text: "Error: No response from model." };

  // 2. Check for Function Call
  const functionCall = response.functionCall;
  
  if (functionCall) {
    const toolName = functionCall.name;
    const toolArgs = functionCall.args;
    
    // Execute Tool
    let toolResult;
    if (toolName === 'get_schedule') {
      toolResult = await toolImpls.get_schedule(toolArgs);
    } else if (toolName === 'book_slot') {
      toolResult = await toolImpls.book_slot(toolArgs);
    } else {
      toolResult = { error: "Unknown tool" };
    }

    // 3. Send Tool Result back to Model
    const resultPrompt = `${prompt}\nModel requested tool: ${toolName} with args ${JSON.stringify(toolArgs)}.\nTool Output: ${JSON.stringify(toolResult)}\nGenerate a final response for the user based on this tool output.`;
    
    const finalResult = await model.generateContent({
        model: 'gemini-2.5-flash',
        contents: resultPrompt,
        config: { systemInstruction }
    });

    return {
      text: finalResult.text || "Action completed.",
      toolCalls: [{ name: toolName, args: toolArgs, result: toolResult }]
    };
  }

  return { text: response.text || "" };
};
