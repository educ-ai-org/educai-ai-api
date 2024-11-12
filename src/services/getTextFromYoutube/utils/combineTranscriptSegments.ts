import { TranscriptSegment } from '../../../types'

export function combineTranscriptSegments(transcript: TranscriptSegment[]): string {
  return transcript
    .map(segment => segment.text.trim())
    .filter(Boolean)
    .join(' ')
}
