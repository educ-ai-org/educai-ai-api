import mammoth from 'mammoth'
import { ResourcesUploaded } from '../../models/ResourcesUploaded'
import getTextFromYoutube from '../getTextFromYoutube/youtubeTranscript'
import PdfParse from 'pdf-parse'
import getTranscription from '../getTranscription/getTranscription'
import uploadBuffer from '../getTranscription/uploadBuffer'

export async function getEducationalResource(
	{ youtubeLink, document, audio, instructions }: ResourcesUploaded
): Promise<string> {
	let content = ''

	if (youtubeLink) {
		try {
			const text = await getTextFromYoutube(youtubeLink)
			content += text
		}
		catch (_e) {
			throw new Error('Error getting text from youtube video')
		}
	}

	if (instructions) [
		content += instructions
	]

	if (document) {
		try {
			let text
			switch (document.mimetype) {
				case 'application/pdf':
					const pdfData = await PdfParse(document.buffer)
					text = pdfData.text
					break
				case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
					const mammothResult = await mammoth.extractRawText({ buffer: document.buffer })
					text = mammothResult.value
					break
				case 'text/plain':
					text = document.buffer.toString('utf-8')
					break
				case 'text/csv':
					text = document.buffer.toString('utf-8')
					break
			}

			content += text
		} catch (error) {
			throw new Error('Error getting text from document')
		}
	}

	if (audio) {
		try {
			const gsFile = await uploadBuffer(audio.buffer, audio.originalname)
			const fileName = `gs://educai-bucket/${audio.originalname}`
			const transcript = await getTranscription(fileName)

			content += '<h1>Audio</h1>'
			content += transcript
		} catch (_e) {
			throw new Error('Error getting text from audio')
		}
	}

	return content
}
