const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) redirectUrl = 'https://triztek.com' + redirectUrl;
        return fetchUrl(redirectUrl).then(resolve);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, status: res.statusCode, length: data.length, data }));
    }).on('error', (err) => resolve({ url, status: 'error', error: err.message }));
  });
}

const targetUrls = [
  'https://triztek.com/blogs/',
  'https://triztek.com/phases-of-sap-business-one-implementation/',
  'https://triztek.com/differences-between-sap-and-erp/',
  'https://triztek.com/test-rest/',
  'https://triztek.com/sap-business-one-software-price-in-india/',
  'https://triztek.com/sap-business-one-partner-in-india/',
  'https://triztek.com/sap-business-one-partner-in-bihar/',
  'https://triztek.com/sap-business-one-partner-in-assam/',
  'https://triztek.com/sap-business-one-partner-in-jharkhand/',
  'https://triztek.com/sap-business-one-partner-in-odisha/',
  'https://triztek.com/plastic-manufacturing-industry/',
  'https://triztek.com/sap-erp-electronics-industry/',
  'https://triztek.com/sap-erp-for-chemical-industry/',
  'https://triztek.com/carrers/',
  'https://triztek.com/contact-us/',
  'https://triztek.com/contact/'
];

async function run() {
  console.log('Fetching target URLs...');
  for (const url of targetUrls) {
    const res = await fetchUrl(url);
    console.log(`${res.status} | ${url} | ${res.length || res.error}`);
  }
}

run();
