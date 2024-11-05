import openai from '../../clients/openai-client'
import { materialTemplateString } from './prompts/materialTemplate'

export default async function generateMaterialOpenAI(
  data: { content: string, model: string }
): Promise<string> {

  const result = await openai.chat.completions.create({
    messages: [
      { role: 'assistant', content: materialTemplateString },
      { role: 'user', content: data.content },
    ],
    model: data.model,
  })

  return result.choices[0].message.content ?? ''
}
