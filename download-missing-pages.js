const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) redirectUrl = 'https://triztek.com' + redirectUrl;
        return fetchUrl(redirectUrl).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, status: res.statusCode, data }));
    }).on('error', reject);
  });
}

const pagesToDownload = [
  { url: 'https://triztek.com/blogs/', outDir: 'blogs' },
  { url: 'https://triztek.com/phases-of-sap-business-one-implementation/', outDir: 'phases-of-sap-business-one-implementation' },
  { url: 'https://triztek.com/differences-between-sap-and-erp/', outDir: 'differences-between-sap-and-erp' },
  { url: 'https://triztek.com/test-rest/', outDir: 'test-rest' },
  { url: 'https://triztek.com/contact-us/', outDir: 'contact-us' },
  { url: 'https://triztek.com/carrers/', outDir: 'carrers' },
  { url: 'https://triztek.com/plastic-manufacturing-industry/', outDir: 'plastic-manufacturing-industry' },
  { url: 'https://triztek.com/sap-erp-electronics-industry/', outDir: 'sap-erp-electronics-industry' },
  { url: 'https://triztek.com/sap-erp-for-chemical-industry/', outDir: 'sap-erp-for-chemical-industry' }
];

async function run() {
  for (const page of pagesToDownload) {
    console.log(`Downloading ${page.url}...`);
    try {
      const res = await fetchUrl(page.url);
      if (res.status === 200) {
        const dir = path.join(__dirname, page.outDir);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const filePath = path.join(dir, 'index.html');
        // Replace absolute triztek.com URLs in resources with local ../assets/ where possible
        let html = res.data;
        // Fix asset paths to point to ../assets/
        html = html.replace(/https:\/\/triztek\.com\/wp-content\/plugins\/[^\/]+\/assets\/[^\"]*\/([a-zA-Z0-9_\-\.]+\.(css|js|png|jpg|svg))/gi, '../assets/css/$1');
        html = html.replace(/https:\/\/triztek\.com\/wp-content\/uploads\/[^\"]*\/([a-zA-Z0-9_\-\.]+\.(png|jpg|svg|webp))/gi, '../assets/images/$1');
        html = html.replace(/http:\/\/triztek\.com\/wp-content\/uploads\/[^\"]*\/([a-zA-Z0-9_\-\.]+\.(png|jpg|svg|webp))/gi, '../assets/images/$1');
        
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Saved ${page.outDir}/index.html (${html.length} bytes)`);
      } else {
        console.warn(`Failed ${page.url} with status ${res.status}`);
      }
    } catch (e) {
      console.error(`Error downloading ${page.url}:`, e.message);
    }
  }
}

run();
