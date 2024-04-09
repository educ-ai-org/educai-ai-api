import axios from 'axios'
import cheerio from 'cheerio'

async function scrapeUrl(url: string) {
    try {
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        const elementsToRemove = [
            'script', 'style', 'noscript', 'iframe', 'img', 'svg', 'button',
            'input', 'form', 'textarea', 'select', 'label', 'nav', 'header',
            'footer', 'aside', 'video', 'audio', 'canvas', 'map', 'object',
            'embed', 'param', 'picture', 'source', 'track', 'area', 'circle',
            'rect', 'polygon', 'use', 'option', 'datalist', 'optgroup', 'fieldset', 'legend',
            'progress', 'meter', 'details', 'summary', 'menuitem', 'menu',
            'dialog'
        ]

        elementsToRemove.forEach(element => $(element).remove())

        const textContents = $('body').text()
        const cleanContents = textContents.replace(/\s+/g, ' ').trim()

        return cleanContents
    } catch (error) {
        console.error(`Error: ${error}`)
        return null
    }
}

export default scrapeUrl
