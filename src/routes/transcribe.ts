import express from 'express'
import TranscribeAudio from '../services/TranscribeAudio/transcribe-audio'

const router = express.Router()

router.get('/transcribe', async (_, res) => {
    const transcription = await TranscribeAudio('https://replicate.delivery/mgxm/e5159b1b-508a-4be4-b892-e1eb47850bdc/OSR_uk_000_0050_8k.wav')
    res.status(200).send(transcription)
})

router.get('/a', (req, res) => {
    res.status(200).send('OK')
})

export default router