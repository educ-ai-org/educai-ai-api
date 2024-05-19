import fs from 'fs';
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import path from 'path';

async function generatePDF(data: { title: string, content: string }) {
	const templateHtml = fs.readFileSync('./src/assets/PDFTemplate.html', 'utf8');
  
	const template = Handlebars.compile(templateHtml);
	const htmlContent = template(data);
  
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
	const pdfBuffer = await page.pdf({
		format: 'A4',
		printBackground: true,
		displayHeaderFooter: false,
		margin: { top: '140px', bottom: '140px' }
	});
  
	await browser.close();

	const pdfPath = path.join(__dirname, 'output.pdf');
	fs.writeFileSync(pdfPath, pdfBuffer);

	return { pdfBuffer, pdfPath };
}

export default generatePDF;