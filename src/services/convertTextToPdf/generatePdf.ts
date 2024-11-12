import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import generateMaterial from '../generateMaterial/generateMaterial'
import { globalTemplateHtml, headerHtml, footerHtml } from './template'
import { BrowserOptions } from '../../types'

export default async function generatePDF(data: { content: string, model: string }) {
	const newData = { content: await generateMaterial(data) }
	const template = Handlebars.compile(globalTemplateHtml)
	const htmlContent = template(newData)

	const browserOptions: BrowserOptions = {
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	}

	const environment = process.env.ENVIROMENT
	if (environment !== 'development') browserOptions.executablePath = '/usr/bin/chromium-browser'

	const browser = await puppeteer.launch(browserOptions)
	const page = await browser.newPage()
	await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

	const pdfBuffer = await page.pdf({
		format: 'A4',
		printBackground: true,
		displayHeaderFooter: true,
		headerTemplate: headerHtml,
		footerTemplate: footerHtml,
		margin: { top: '100px', bottom: '100px', left: '20px', right: '20px' }
	})

	await browser.close()
	return pdfBuffer
}
