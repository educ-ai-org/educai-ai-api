import { generateQuestionsOpenAI } from './generateQuestionsOpenAi'

export async function generateQuestions(
    text: string,
    questionsNumber: number,
    level: string,
    theme: string,
    relatedTheme: string,
) {
    return await generateQuestionsOpenAI(text, questionsNumber, level, theme, relatedTheme)
}
