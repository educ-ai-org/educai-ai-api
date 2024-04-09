import { fetchTranscript } from './fetchTranscript'

async function getTextFromYoutube(videoUrl: string) {
    let allText = ''
    const transcript = await fetchTranscript(videoUrl)

    for (const text of transcript) {
        allText += text.text + ' '
    }

    return allText
}

export default getTextFromYoutube
