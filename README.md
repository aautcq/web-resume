# HTML to PDF resume

In this repo, you'll find a HTML/CSS template for a resume, along with a JS script to generate a PDF from it.

## HTML resume

It is sharable as is, and responsive. Which is wow.

## Build to PDF

The PDF is generated using Headless Chrome through [Puppeteer](https://github.com/puppeteer/puppeteer/tree/main), then shrunk using Alfred Klomp's [shrinkpdf](https://github.com/aklomp/shrinkpdf) script.

First, install the dependencies, with NPM or whatever your prefered package manager is:

```bash
npm i
```

Then, run the build script:

```bash
npm run build
```

You'll find the PDF file at the root of your project. If you have your own version of this repository on your github account, you can directly create a GitHub Pages website to have it hosted.
