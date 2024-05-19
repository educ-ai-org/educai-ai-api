import express from 'express'
import multer from 'multer'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import getTextFromYoutube from '../services/getTextFromYoutube/youtubeTranscript'
import scrapeUrl from '../services/scrapeUrl/scrapeUrl'
import generateQuestions from '../services/generateQuestions/generate-questions'
import getTranscription from '../services/getTranscription/getTranscription'
import uploadBuffer from '../services/getTranscription/uploadBuffer'
import getEduResonse from '../services/getEduResponse/getEduResponse'
import generatePDF from '../services/convertTextToPdf/generatePdf'

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
                const mammothResult = await mammoth.extractRawText({ buffer: req.file.buffer })
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

router.post('/generate-question', async (req, res) => {
    const { text, numberOfQuestions } = req.body
    if (!text) {
        return res.status(400).send('Text is required.')
    }
    const response = await generateQuestions(text, numberOfQuestions)
    res.send(response)
})

router.post('/transcription', upload.single('file'), async (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.')
    }

    const file = req.file.buffer
    const Uint8ArrayBuffer = new Uint8Array(file)

    try {
        const gsFile = await uploadBuffer(file, req.file.originalname)
        const fileName = `gs://educai-bucket/${req.file.originalname}`
        const transcript = await getTranscription(fileName)
        res.status(200).send({ text: transcript })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})
router.post('/edu-response', async (req, res) => {
    console.log('bateu no edu')
    const { question } = req.body
    if (!question) {
        return res.status(400).send('Question is required.')
    }
    const response = await getEduResonse(question)
    res.status(200).send({ response })
})

router.post('/convert-text-to-pdf', async (req, res) => {
    const { title, content } = req.body as { title: string, content: string }

    if (!title || !content) {
        return res.status(400).send('Text and title are required.')
    }

    try {
        const { pdfBuffer } = await generatePDF({ title, content });

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="output.pdf"',
            'Content-Length': pdfBuffer.length
        });

        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao gerar o PDF');
    }
})

export default router
