import { PromptTemplate } from 'langchain/prompts'
import model from '../../clients/google-client'
import { questionTemplate } from './prompts/question'

async function generateQuestions(text: string, questionsNumber: number) {

    const questions = questionsNumber.toString()

    const chain = questionTemplate.pipe(model)

    const result = await chain.invoke({ text: text }).then((result) => {
        return result.lc_kwargs.content
    })

    let cleanText = result
    if (cleanText.startsWith("```json ")) {
        cleanText = cleanText.substring(7); // Remove os primeiros 7 caracteres
    }
    if (cleanText.endsWith(" ```")) {
        cleanText = cleanText.substring(0, cleanText.length - 3); // Remove os últimos 3 caracteres
    }

    console.log(cleanText)
    const json = JSON.parse(cleanText)
    
    return json
}

export default generateQuestions