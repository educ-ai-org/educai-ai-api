import { v2, protos } from '@google-cloud/speech'
const speech = protos.google.cloud.speech.v2

export default async function getTranscription(buffer: Uint8Array) {
  const jsonPath = './key.json'

  const client = new v2.SpeechClient({
    keyFilename: jsonPath
  })

  try {
    const [response] = await client.recognize({ content: buffer })
    const transcription = response.results?.map(result => {
      if (!result.alternatives) return ''
      return result.alternatives[0].transcript
    }).join('\n')
    return transcription
  }
  catch (error) {
    console.error('Error transcribing audio:', error)
  }
}
