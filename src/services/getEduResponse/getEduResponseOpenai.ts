import openai from '../../clients/openai-client'
import { eduTemplateResponse } from './prompts/eduSystemPrompt'

type ChatMessages = {
  role: 'system' | 'user' | 'assistant',
  content: string
}

export default async function getEduResponse(messages: ChatMessages[]) {
  console.log('messages:', messages)
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: eduTemplateResponse },
        ...messages
      ]
    })
    return response.choices[0].message.content
  } catch (error) {
    console.error('Error fetching response:', error)
    throw error
  }
}
