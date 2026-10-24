const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');
const links = [];
const regex = /href=["'](https?:\/\/triztek\.com\/[^"']*)["']/g;
let match;
while ((match = regex.exec(html)) !== null) {
  links.push(match[1]);
}

const uniqueLinks = Array.from(new Set(links));
console.log('Total unique triztek.com links in index.html:', uniqueLinks.length);
console.log(JSON.stringify(uniqueLinks, null, 2));
