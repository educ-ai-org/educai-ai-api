import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import model from '../../clients/google-client'
import { getFeedbackFromChatTemplate } from '../getFeedback/getFeedbackFromChatTemplate'
import generatePDF from '../convertTextToPdf/generatePdf'

export default async function getEduResonse(messages: any): Promise<Buffer> {
  const parser = new JsonOutputFunctionsParser()
  getFeedbackFromChatTemplate.outputParser = parser

  const chain = getFeedbackFromChatTemplate.pipe(model)

  const result = await chain.invoke({ messages: messages }).then((result) => {
      return result.lc_kwargs.content
  })

  let cleanText: string = result.replace(/^```json\s*|\s*```$/gmi, '')

  const pdf = await generatePDF({ content: cleanText})

  return pdf
}
