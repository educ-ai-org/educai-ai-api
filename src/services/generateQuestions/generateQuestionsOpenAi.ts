import openai from '../../clients/openai-client'
import { questionTemplateString } from './prompts/question'

export async function generateQuestionsOpenAI(
  text: string,
  questionsNumber: number,
  level: string,
  theme: string,
  relatedTheme: string,
  model: string
): Promise<string> {

  const prompt = `

  text: ${text}

  questionsNumber: ${questionsNumber}

  level: ${level}

  theme: ${theme}

  relatedTheme: ${relatedTheme}

  `

  const openaiModel = model.split(':')[1]
  const result = await openai.chat.completions.create({
    messages: [
      { role: 'assistant', content: questionTemplateString },
      { role: 'user', content: prompt }
    ],
    model: openaiModel
  })

  return result.choices[0].message.content ?? ''
}
