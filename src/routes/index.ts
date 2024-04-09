import express from 'express'
import multer from 'multer'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import getTextFromYoutube from '../services/getTextFromYoutube/youtubeTranscript'
import scrapeUrl from '../services/scrapeUrl/scrapeUrl'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/health', (_, res) => {
    res.status(200).send('OK')
})

router.post('/extract-text', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.')
    }

    try {
        let text
        switch (req.file.mimetype) {
            case 'application/pdf':
                const pdfData = await pdfParse(req.file.buffer)
                text = pdfData.text
                break
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                const mammothResult = await mammoth.extractRawText({buffer: req.file.buffer})
                text = mammothResult.value
                break
            case 'text/plain':
                text = req.file.buffer.toString('utf-8')
                break
            case 'text/csv':
                text = req.file.buffer.toString('utf-8')
                break
            default:
                return res.status(400).send('File format not supported.')
        }

        res.send({ text })
    } catch (error) {
        console.error(error)
        res.status(500).send('Error processing the file.')
    }
})

router.post('/youtube-extract', async (req, res) => {
    try {
        const { url } = req.body
        const text = await getTextFromYoutube(url)
        res.send({ text })
    } catch (error) {
        res.status(500).send(req)
    }
})

router.post('/scrape-url', async (req, res) => {
    const { url } = req.body
    if (!url) {
        return res.status(400).send('URL is required.')
    }
    const text = await scrapeUrl(url)
    res.send({ text })
})

export default router
