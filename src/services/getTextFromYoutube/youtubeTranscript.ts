import { YoutubeTranscript } from 'youtube-transcript'

async function getTextFromYoutube(videoUrl: string) {
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl)
    return transcript
}

export default getTextFromYoutube