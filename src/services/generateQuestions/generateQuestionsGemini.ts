import gemini from '../../clients/google-client'
import { questionTemplate } from './prompts/question'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'


export async function generateQuestionsGemini(text: string, questionsNumber: number, level: string, theme: string, relatedTheme: string) {

    const parser = new JsonOutputFunctionsParser()
    questionTemplate.outputParser = parser

    const questions = questionsNumber.toString()

    const chain = questionTemplate.pipe(gemini)
    try {
        const result = await chain.invoke({ text: text, number: questions, difficulty: level, theme: theme, relatedTo: relatedTheme }).then((result) => {
            return result.lc_kwargs.content
        })

        let cleanText = result.replace(/^```json\s*|\s*```$/gmi, '')

        return cleanText
    } catch (_e) {
        throw new Error('Error trying to generate questions')
    }
}
