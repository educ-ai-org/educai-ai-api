import replicate from '../../clients/replicate-client'

async function TranscribeAudio(audioPath: string) {
    const replicateModel = 'openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2'

    const output = await replicate.run(
        replicateModel,
        {
            input: {
                audio: audioPath,
                model: 'large-v3',
                language: 'en',
                transcription: 'plain text'
            }
        }
    )

    return output
}

export default TranscribeAudio