import { materialTemplate } from './prompts/materialTemplate'
import model from '../../clients/google-client'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { questionTemplate } from '../generateQuestions/prompts/question'

export default async function generateMaterial(
  data: { content: string }
): Promise<string> {
  const content = data.content
  const chain = materialTemplate.pipe(model)
  const result = await chain.invoke({ content }).then((result) => {
    return result.lc_kwargs.content
  })

  let cleanText = result.replace(/^```html\s*|\s*```$/gmi, '')

  return cleanText
}
