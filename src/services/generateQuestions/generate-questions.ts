import { PromptTemplate } from 'langchain/prompts'
import model from '../../clients/google-client'
import { questionTemplate } from './prompts/question'

async function generateQuestions(text: string, questionsNumber: number) {

    const questions = questionsNumber.toString()

    const chain = questionTemplate.pipe(model)

    const result = await chain.invoke({ text: text, number: questions }).then((result) => {
        return result.lc_kwargs.content
    })

    let cleanText = result.replace(/^```json\s*|\s*```$/gmi, '')

    return cleanText
}

export default generateQuestions