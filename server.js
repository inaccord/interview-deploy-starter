'use strict'

const http = require('http')
const os = require('os')

const HOST = '127.0.0.1'
const PORT = 3000

const startedAt = new Date()

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(JSON.stringify(body))
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    return json(res, 200, { status: 'ok' })
  }

  if (req.url === '/') {
    return json(res, 200, {
      service: 'accord-status-service',
      hostname: os.hostname(),
      uptimeSeconds: Math.round((Date.now() - startedAt.getTime()) / 1000),
      greeting: process.env.GREETING || 'hello from the sandbox'
    })
  }

  json(res, 404, { error: 'not found' })
})

server.listen(PORT, HOST, () => {
  console.log(`listening on http://${HOST}:${PORT}`)
})
