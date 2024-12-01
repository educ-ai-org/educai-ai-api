import express from 'express'
import multer from 'multer'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import getTextFromYoutube from '../services/getTextFromYoutube/youtubeTranscript'
import scrapeUrl from '../services/scrapeUrl/scrapeUrl'
import getTranscription from '../services/getTranscription/getTranscription'
import uploadBuffer from '../services/getTranscription/uploadBuffer'
import getEduResonse from '../services/getEduResponse/getEduResponse'
import generatePDF from '../services/convertTextToPdf/generatePdf'
import { getEducationalResource } from '../services/getEducationalResource/getEducationalResource'
import { ResourcesUploaded } from '../models/ResourcesUploaded'
import getFeedbackFromChat from '../services/getFeedback/getFeedbackFromChat'
import { generateQuestions } from '../services/generateQuestions/generateQuestions'
import getEduResponse from '../services/getEduResponse/getEduResponseOpenai'

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
    const { messages, openai } = req.body
    console.log(openai)
    if (openai) {
        console.log('openai')
        const response = await getEduResponse(messages)
        return res.status(200).send({ response })
    }
    const response = await getEduResonse('question')
    res.status(200).send({ response })
})

router.post('/convert-text-to-pdf', async (req, res) => {
    const { content, model } = req.body as { content: string, model: string }

    if (!content) {
        return res.status(400).send('Text and title are required.')
    }

    try {
        const pdfBuffer = await generatePDF({ content, model })

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment filename="output.pdf"',
            'Content-Length': pdfBuffer.length
        })

        res.send(pdfBuffer)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

router.post('/generate-educational-resource', upload.fields([{name: 'audio'}, { name: 'document' }]) , async (req, res) => {
    const { youtubeLink, instructions } = req.body as ResourcesUploaded
    const { model } = req.query as { model: string }
    const { audio, document } = req.files as { audio: Express.Multer.File[], document: Express.Multer.File[] }

    if(!youtubeLink && !audio && !document && !instructions) {
        return res.status(400).send('Missing parameters')
    }

    const audioFile = audio ? audio[0] : null
    const documentFile = document ? document[0] : null

    let data = {
        content: await getEducationalResource({ youtubeLink, document: documentFile, audio: audioFile, instructions }),
        model: model ?? 'gemini'
    }

    try {
        const pdfBuffer = await generatePDF(data)

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment filename="output.pdf"',
            'Content-Length': pdfBuffer.length
        })

        res.send(pdfBuffer)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

router.post('/generate-questions', upload.fields([{name: 'audio'}, { name: 'document' }]), async (req, res) => {
    const { youtubeLink, instructions, level, theme, relatedTheme, numberOfQuestions } = req.body
    const { audio, document } = req.files as { audio: Express.Multer.File[], document: Express.Multer.File[] }

    if(!youtubeLink && !audio && !document && !instructions) {
        return res.status(400).send('Missing parameters')
    }

    const audioFile = audio ? audio[0] : null
    const documentFile = document ? document[0] : null

    try {
        const data = {
            content: await getEducationalResource({ youtubeLink, document: documentFile, audio: audioFile, instructions }),
        }
        const questions = await generateQuestions(data.content, numberOfQuestions, level, theme, relatedTheme)
        const question = await JSON.parse(questions).slice(0, numberOfQuestions)

        res.send(question)
    } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao gerar a questão!')
    }
})

router.post('/feedback', async (req, res) => {
    const { messages, studentName, model } = req.body
    if (!messages) {
        return res.status(400).send('Feedback is required.')
    }
    if (!studentName) {
        return res.status(400).send('Student name is required.')
    }
    const response = await getFeedbackFromChat(messages, studentName, model)

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="output.pdf"`,
        'Content-Length': response.length
    })

    res.status(200).send(response)
})

export default router
