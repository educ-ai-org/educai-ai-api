import fs from 'fs'
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import generateMaterial from '../generateMaterial/generateMaterial'
// import path from 'path'

async function generatePDF(data: { content: string }) {

	const iaMaterial = await generateMaterial(data)
	const newData = { content: iaMaterial }
	const templateHtml = fs.readFileSync('./src/assets/ContentTemplate.html', 'utf8')
	const headerHtml = fs.readFileSync('./src/assets/HeaderAndFooterTemplate.html', 'utf8')
	const footerHtml = fs.readFileSync('./src/assets/HeaderAndFooterTemplate.html', 'utf8')

	const template = Handlebars.compile(templateHtml)
	const htmlContent = template(newData)

	const browser = await puppeteer.launch()
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
	// const pdfPath = path.join(__dirname, 'output.pdf')
	// fs.writeFileSync(pdfPath, pdfBuffer)

	return pdfBuffer
}

export default generatePDF
