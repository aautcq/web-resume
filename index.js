const puppeteer = require('puppeteer');
const fs = require('fs');
const sharp = require('sharp');
const exec = require('@actions/exec');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  // convert images to WEBP
  page.on('request', async (req) => {
    if (req.resourceType() !== 'image') {
      req.continue();
      return;
    }
    try {
      const response = await fetch(req.url(), {
        method: req.method(),
        headers: req.headers(),
      });
      const buffer = await response.arrayBuffer();
      const image = await sharp(buffer)
        .webp({ quality: 100, lossless: true })
        .rotate()
        .toBuffer();
      req.respond({ body: image });
    } catch {
      req.continue();
    }
  });

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
  const fileTitle = title.replace(/\s/g, '-').toLowerCase();
  const tmpFileTitle = fileTitle + '.tmp.pdf';
  const finalFileTitle = fileTitle + '.pdf';

  await page.pdf({
    path: tmpFileTitle,
    width,
    height,
    printBackground: true
  });

  await browser.close();

  // shrink PDF
  await exec.exec(`./shrinkpdf.sh -r 300 -o ${finalFileTitle} ${tmpFileTitle}`);

  // remove temporary file
  await exec.exec(`rm ${tmpFileTitle}`);

  console.log(`PDF generated: ${finalFileTitle}`);
})();
