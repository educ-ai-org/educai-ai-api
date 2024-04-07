import express from 'express'
import getTextFromYoutube from '../services/getTextFromYoutube/youtubeTranscript'

const router = express.Router()

router.get('/health', (_, res) => {
    res.status(200).send('OK')
})

router.get('/hello', async (_, res) => {
    const text = await getTextFromYoutube('https://www.youtube.com/watch?v=lAy04mwaL7U')
    res.status(200).send(text)
})

export default router