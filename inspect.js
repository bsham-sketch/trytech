const fs = require('fs');
const path = require('path');

const csv = fs.readFileSync('urls.csv', 'utf8');
const lines = csv.split('\n').filter(Boolean).slice(1);

lines.forEach(line => {
  const match = line.match(/^"([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
  if (!match) return;
  const localPath = match[4];
  const pageTitle = match[5];
  if (fs.existsSync(localPath)) {
    const html = fs.readFileSync(localPath, 'utf8');
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    console.log(localPath, '|| H1s:', h1s.join(' // '), '|| Title:', pageTitle);
  }
});
