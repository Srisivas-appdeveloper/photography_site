import http from 'node:http';

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Waiting for Next.js on port 3000...');
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(3001, '0.0.0.0', () => {
  console.log('Bridge proxy listening on http://0.0.0.0:3001 -> forwarding to 3000');
});
