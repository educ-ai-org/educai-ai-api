import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import model from '../../clients/google-client'
import { getFeedbackFromChatTemplate } from '../getFeedback/getFeedbackFromChatTemplate'
import generatePDF from '../convertTextToPdf/generatePdf'

export type Messages = {
  message: string
  isUser: boolean
}

export default async function getFeedbackFromChat(messages: Messages[]): Promise<Buffer> {
  const parser = new JsonOutputFunctionsParser()
  getFeedbackFromChatTemplate.outputParser = parser

  const chain = getFeedbackFromChatTemplate.pipe(model)

  const messagesString = messages.toString()

  const result = await chain.invoke({ messages: messagesString }).then((result) => {
      return result.lc_kwargs.content
  })

  let cleanText: string = result.replace(/^```json\s*|\s*```$/gmi, '')

  const pdf = await generatePDF({ content: cleanText})

  return pdf
}
