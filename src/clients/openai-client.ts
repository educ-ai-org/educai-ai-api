import OpenAI from 'openai'

const token = process.env.GITHUB_TOKEN
const endpoint = 'https://models.inference.ai.azure.com'

const openai = new OpenAI({
  apiKey: token,
  baseURL: endpoint
})

export default openai
