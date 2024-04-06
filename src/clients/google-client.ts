import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

const model = new ChatGoogleGenerativeAI({
    apiKey: '',
    modelName: 'gemini-pro'
})

export default model