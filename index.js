const puppeteer = require('puppeteer');
const fs = require('fs');

const RESUME_HEIGHT = 1331;

(async () => {
  // Create a browser instance
  const browser = await puppeteer.launch({ headless: 'new' });

  // Create a new page
  const page = await browser.newPage();

  // Get HTML content from HTML file
  const html = fs.readFileSync('index.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  await page.pdf({
    path: 'CV-adrien-autricque-fr.pdf',
    width: 800,
    height: RESUME_HEIGHT,
    printBackground: true
  });

  // Close the browser instance
  await browser.close();
})();
