import { fetchTranscript } from './fetchTranscript'

async function getTextFromYoutube(videoUrlOrId: string) {
    let allText = ''
    const urlRegex = /v=([a-zA-Z0-9_-]{11})/
    let id = videoUrlOrId

    const match = videoUrlOrId.match(urlRegex)
    if (match) {
        id = match[1]
    }

    const transcript = await fetchTranscript(id)

    for (const text of transcript) {
        allText += text.text + ' '
    }

    return allText
}

export default getTextFromYoutube
