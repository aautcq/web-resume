const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // set page content (HTML and CSS)
  const html = fs.readFileSync('index.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ path: 'style.css' });

  // to reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // wait for the fonts to be loaded
  await page.evaluateHandle('document.fonts.ready');

  // get page dimensions
  const elem = await page.$('body');
  const { height, width } = await elem.boundingBox();

  // get page title
  const title = await page.title();
  const formattedTitle = title.replace(/\s/g, '-').toLowerCase() + '.pdf';

  await page.pdf({
    path: formattedTitle,
    width,
    height,
    printBackground: true
  });

  await browser.close();

  console.log(`PDF generated: ${formattedTitle}`)
})();
