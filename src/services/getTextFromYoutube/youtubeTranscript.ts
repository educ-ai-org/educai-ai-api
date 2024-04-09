import { fetchTranscript } from './fetchTranscript'

async function getTextFromYoutube(videoUrl: string) {
    let allText = ''
    const transcript = await fetchTranscript(videoUrl)
    for (const text of transcript) {
        allText += text.text + ' '
    }
    console.log(allText)
}

getTextFromYoutube('https://www.youtube.com/watch?v=kx5qKJK_Jbc')
export default getTextFromYoutube
