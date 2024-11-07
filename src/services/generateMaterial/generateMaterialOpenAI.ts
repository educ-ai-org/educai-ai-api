import openai from '../../clients/openai-client'
import { materialSystemPrompt } from './prompts/materialSystemPrompt'

export default async function generateMaterialOpenAI(
  data: { content: string, model: string }
): Promise<string> {

  const openaiModel = data.model.split(':')[1]

  const result = await openai.chat.completions.create({
    messages: [
      { role: 'assistant', content: materialSystemPrompt },
      { role: 'user', content: data.content },
    ],
    model: openaiModel
  })

  return result.choices[0].message.content ?? ''
}
