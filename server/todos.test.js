'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const { createTodoStore } = require('./todos')

test('add, toggle, remove', () => {
  const store = createTodoStore()
  const todo = store.add('write a Dockerfile')
  assert.strictEqual(store.list().length, 1)
  assert.strictEqual(todo.done, false)
  assert.strictEqual(store.toggle(todo.id).done, true)
  assert.strictEqual(store.remove(todo.id), true)
  assert.deepStrictEqual(store.list(), [])
})

test('unknown ids are handled', () => {
  const store = createTodoStore()
  assert.strictEqual(store.toggle('nope'), null)
  assert.strictEqual(store.remove('nope'), false)
})
