const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 5173;
const ROOT = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function safePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.normalize(cleanPath).replace(/^(\.\.[/\\])+/, '');
  const targetPath = path.join(ROOT, normalized);
  if (!targetPath.startsWith(ROOT)) return null;
  return targetPath;
}

const server = http.createServer((req, res) => {
  const rawPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = safePath(rawPath);

  if (!filePath) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
    return;
  }

  fs.stat(filePath, (statErr, stats) => {
    if (statErr) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const finalPath = stats.isDirectory() ? path.join(filePath, 'index.html') : filePath;
    fs.readFile(finalPath, (readErr, data) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }

      const ext = path.extname(finalPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
