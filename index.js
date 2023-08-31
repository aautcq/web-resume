const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Create a browser instance
  const browser = await puppeteer.launch({ headless: 'new' });

  // Create a new page
  const page = await browser.newPage();

  // Set page content (HTML and CSS)
  const html = fs.readFileSync('index.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ path: 'style.css' });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // Wait for the fonts to be loaded
  await page.evaluateHandle('document.fonts.ready');

  // Get page dimensions
  const elem = await page.$('.resume');
  const { height, width } = await elem.boundingBox();

  // Get page title
  const title = await page.title();
  const formattedTitle = title.replace(/\s/g, '-').toLowerCase() + '.pdf';
  console.log(formattedTitle);

  // Downlaod the PDF
  await page.pdf({
    path: formattedTitle,
    width,
    height,
    printBackground: true
  });

  // Close the browser instance
  await browser.close();
})();
