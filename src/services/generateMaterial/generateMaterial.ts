import { materialTemplate } from './prompts/materialTemplate'
import model from '../../clients/google-client'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { questionTemplate } from '../generateQuestions/prompts/question'

export default async function generateMaterial(
  data: { content: string }
): Promise<string> {
  const parser = new JsonOutputFunctionsParser()
  questionTemplate.outputParser = parser

  const chain = materialTemplate.pipe(model)
  const result = await chain.invoke(data).then((result) => {
    return result.lc_kwargs.content
  })

  let cleanText = result.replace(/^```json\s*|\s*```$/gmi, '')

  return cleanText
}
