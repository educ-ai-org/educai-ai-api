import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

const model = new ChatGoogleGenerativeAI({
    apiKey: 'AIzaSyBUCK_-ige0dSr0aXdTurCbG44ou_tewbA',
    modelName: 'gemini-pro'
})

export default model