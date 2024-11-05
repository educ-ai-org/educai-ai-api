import generateMaterialGemini from './generateMaterialGemini'
import generateMaterialOpenAI from './generateMaterialOpenAI'

export default async function generateMaterial(
  data: { content: string, model: string }
): Promise<string> {

  let result = ''
  if (data.model === 'gemini') result = await generateMaterialGemini(data)
  if (data.model.includes('openai')) result = await generateMaterialOpenAI(data)

  return result
}
