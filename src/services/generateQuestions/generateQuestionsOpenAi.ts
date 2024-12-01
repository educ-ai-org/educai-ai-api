import openai from '../../clients/openai-client'
import { questionSystemPrompt } from './prompts/questionSystemPrompt'

export async function generateQuestionsOpenAI(
  text: string,
  questionsNumber: number,
  level: string,
  theme: string,
  relatedTheme: string
): Promise<string> {

  const prompt = `

  text: ${text}

  questionsNumber: ${questionsNumber}

  level: ${level}

  theme: ${theme}

  relatedTheme: ${relatedTheme}

  `

  const result = await openai.chat.completions.create({
    messages: [
      { role: 'assistant', content: questionSystemPrompt },
      { role: 'user', content: prompt }
    ],
    model: 'gpt-4o'
  })

  return result.choices[0].message.content ?? ''
}
