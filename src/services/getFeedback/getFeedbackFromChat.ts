import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import gemini from '../../clients/google-client'
import { getFeedbackFromChatTemplate } from '../getFeedback/getFeedbackFromChatTemplate'
import generatePDF from '../convertTextToPdf/generatePdf'

export type Messages = {
  message: string
  isUser: boolean
}

export default async function getFeedbackFromChat(
  messages: Messages[],
  studentName: string,
  model: string
): Promise<Buffer> {
  const parser = new JsonOutputFunctionsParser()
  getFeedbackFromChatTemplate.outputParser = parser

  const chain = getFeedbackFromChatTemplate.pipe(gemini)

  const messagesString = JSON.stringify(messages)

  const result = await chain.invoke({ messages: messagesString, studentName: studentName }).then((result) => {
      return result.lc_kwargs.content
  })

  let cleanText: string = result.replace(/^```json\s*|\s*```$/gmi, '')

  const pdf = await generatePDF({ content: cleanText, model })

  return pdf
}
