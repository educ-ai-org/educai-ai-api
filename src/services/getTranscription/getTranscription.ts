import { SpeechClient } from '@google-cloud/speech';

export default async function getTranscription(filePath: string): Promise<string> {
  const client = new SpeechClient({ keyFilename: './key.json' });

  try {
    const [response] = await client.recognize({
      audio: {
        uri: filePath
      },
      config: {
        encoding: 'MP3',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
      }
    })

    let transcript = ''
    const results = response.results
    if (results){
      results.forEach(result => {
        if(result.alternatives){
          result.alternatives.forEach(alternative => {
            transcript += alternative.transcript + ''
          })
        }
      })
    }

    return transcript
  } catch (error) {
    console.error('Failed to transcribe audio:', error);
    throw error;
  }
}
