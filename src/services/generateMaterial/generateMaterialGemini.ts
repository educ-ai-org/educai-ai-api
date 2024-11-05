import { materialTemplate } from './prompts/materialTemplate'
import gemini from '../../clients/google-client'

export default async function generateMaterialGemini(
  data: { content: string }
): Promise<string> {
  const content = data.content
  const chain = materialTemplate.pipe(gemini)
  const result = await chain.invoke({ content }).then((result) => {
    return result.lc_kwargs.content
  })

  let cleanText = result.replace(/^```html\s*|\s*```$/gmi, '')

  return cleanText
}
