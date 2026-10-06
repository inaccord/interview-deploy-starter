'use strict'

const crypto = require('crypto')

// In-memory store. Each server instance has its own list, and it is lost on restart.
function createTodoStore() {
  const items = new Map()

  return {
    list() {
      return [...items.values()]
    },
    add(title) {
      const todo = { id: crypto.randomUUID(), title, done: false, createdAt: new Date().toISOString() }
      items.set(todo.id, todo)
      return todo
    },
    toggle(id) {
      const todo = items.get(id)
      if (!todo) return null
      todo.done = !todo.done
      return todo
    },
    remove(id) {
      return items.delete(id)
    }
  }
}

module.exports = { createTodoStore }
