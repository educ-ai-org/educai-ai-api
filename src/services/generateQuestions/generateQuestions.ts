import { generateQuestionsGemini } from './generateQuestionsGemini'
import { generateQuestionsOpenAI } from './generateQuestionsOpenAi'

export async function generateQuestions(
    text: string,
    questionsNumber: number,
    level: string,
    theme: string,
    relatedTheme: string,
    model: string
) {
    let result = ''

    if (model === 'gemini') result = await generateQuestionsGemini(text, questionsNumber, level, theme, relatedTheme)
    if (model.includes('openai')) result = await generateQuestionsOpenAI(text, questionsNumber, level, theme, relatedTheme, model)

    return result
}
