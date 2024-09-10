import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { config } from 'dotenv';

config();

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: 'gemini-1.5-pro'
})

export default model
