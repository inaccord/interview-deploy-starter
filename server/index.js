'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const os = require('os')
const { createTodoStore } = require('./todos')

const HOST = '0.0.0.0'
const PORT = Number(process.env.PORT) || 3000
const DIST = path.join(__dirname, '..', 'dist')

const todos = createTodoStore()
const startedAt = new Date()

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8'
}

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 10_000) reject(new Error('body too large'))
    })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

function serveStatic(req, res) {
  if (!fs.existsSync(DIST)) {
    return json(res, 503, { error: 'frontend not built; run npm run build' })
  }
  const url = new URL(req.url, 'http://localhost')
  let filePath = path.join(DIST, path.normalize(url.pathname))
  if (!filePath.startsWith(DIST)) return json(res, 403, { error: 'forbidden' })
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, 'index.html')
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(filePath)] || 'application/octet-stream' })
  fs.createReadStream(filePath).pipe(res)
}

async function handleApi(req, res) {
  const url = new URL(req.url, 'http://localhost')
  const match = url.pathname.match(/^\/api\/todos(?:\/([^/]+))?$/)
  if (!match) return json(res, 404, { error: 'not found' })
  const id = match[1]

  try {
    if (req.method === 'GET' && !id) return json(res, 200, todos.list())
    if (req.method === 'POST' && !id) {
      const { title } = await readBody(req)
      if (typeof title !== 'string' || !title.trim()) return json(res, 400, { error: 'title is required' })
      return json(res, 201, todos.add(title.trim()))
    }
    if (req.method === 'PATCH' && id) {
      const updated = todos.toggle(id)
      return updated ? json(res, 200, updated) : json(res, 404, { error: 'not found' })
    }
    if (req.method === 'DELETE' && id) {
      return todos.remove(id) ? json(res, 204, {}) : json(res, 404, { error: 'not found' })
    }
    return json(res, 405, { error: 'method not allowed' })
  } catch (err) {
    return json(res, 400, { error: err.message })
  }
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') return json(res, 200, { status: 'ok' })
  if (req.url === '/api/info') {
    return json(res, 200, {
      hostname: os.hostname(),
      uptimeSeconds: Math.round((Date.now() - startedAt.getTime()) / 1000),
      revision: process.env.K_REVISION || 'local'
    })
  }
  if (req.url.startsWith('/api/')) return handleApi(req, res)
  return serveStatic(req, res)
})

server.listen(PORT, HOST, () => {
  console.log(`listening on http://${HOST}:${PORT}`)
})
