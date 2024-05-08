import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import model from '../../clients/google-client'
import { eduTemplateResponse } from './eduTemplateResponse'

export default async function getEduResonse(question: string): Promise<string> {
  const parser = new JsonOutputFunctionsParser()
  eduTemplateResponse.outputParser = parser

  const chain = eduTemplateResponse.pipe(model)

  const result = await chain.invoke({ message: question }).then((result) => {
      return result.lc_kwargs.content
  })

  let cleanText: string = result.replace(/^```json\s*|\s*```$/gmi, '')

  return cleanText
}
