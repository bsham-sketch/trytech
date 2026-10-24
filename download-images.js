const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return resolve();
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) return resolve();
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', () => resolve());
  });
}

async function findAndDownloadImages() {
  const dirs = [
    'blogs',
    'phases-of-sap-business-one-implementation',
    'differences-between-sap-and-erp',
    'test-rest',
    'contact-us',
    'carrers',
    'plastic-manufacturing-industry',
    'sap-erp-electronics-industry',
    'sap-erp-for-chemical-industry'
  ];

  const imageUrls = new Set();
  for (const d of dirs) {
    const file = path.join(d, 'index.html');
    if (fs.existsSync(file)) {
      const html = fs.readFileSync(file, 'utf8');
      const matches = html.matchAll(/https?:\/\/[^"'\s]+\.(?:png|jpg|jpeg|svg|webp)/gi);
      for (const m of matches) {
        if (m[0].includes('triztek.com')) {
          imageUrls.add(m[0]);
        }
      }
    }
  }

  console.log('Found', imageUrls.size, 'remote images in new pages.');
  for (const url of imageUrls) {
    const filename = path.basename(url.split('?')[0]);
    const dest = path.join('assets', 'images', filename);
    await downloadImage(url, dest);
  }
  console.log('Image download completed.');
}

findAndDownloadImages();
