import { fetchTranscript } from './fetchTranscript'
import { combineTranscriptSegments } from './utils/combineTranscriptSegments'
import { extractVideoId } from './utils/extractVideoId'

export default async function getTextFromYoutube(videoUrlOrId: string): Promise<string> {
  try {
    const videoId = extractVideoId(videoUrlOrId)
    const transcript = await fetchTranscript(videoId)
    return combineTranscriptSegments(transcript)
  } catch (error) {
    throw new Error(
      `Falha ao obter transcrição: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    )
  }
}
