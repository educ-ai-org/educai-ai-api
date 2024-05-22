import { materialTemplate } from './prompts/materialTemplate'
import model from '../../clients/google-client'

export default async function generateMaterial(
  data: { content: string }
) {
  const chain = materialTemplate.pipe(model)
  const result = await chain.invoke(data).then((result) => {
    return result.lc_kwargs.content
  })

  let cleanText = result.replace(/^```json\s*|\s*```$/gmi, '')

  return cleanText
}
