import { GoogleGenAI } from '@google/genai'

export async function getProductSummary(product) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not configured')
  }

  const ai = new GoogleGenAI({ apiKey })
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `You are an ecommerce product assistant.

Create a concise summary covering what the product is, its main features,
key benefits, and who it suits.

Product: ${JSON.stringify(product)}`,
  })

  return response.text
}
