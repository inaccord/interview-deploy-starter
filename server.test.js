'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const http = require('http')

test('health endpoint responds ok', async () => {
  const proc = require('child_process').spawn(process.execPath, ['server.js'])
  await new Promise((resolve) => proc.stdout.once('data', resolve))
  try {
    const body = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:3000/health', (res) => {
        let data = ''
        res.on('data', (c) => (data += c))
        res.on('end', () => resolve(JSON.parse(data)))
      }).on('error', reject)
    })
    assert.deepStrictEqual(body, { status: 'ok' })
  } finally {
    proc.kill()
  }
})
