import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { config } from 'dotenv';

config();

const gemini = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: 'gemini-pro'
})

export default gemini
