import { FormEvent, useEffect, useState } from 'react'
import { api, Info, Todo } from './api'

export function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [info, setInfo] = useState<Info | null>(null)
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function refresh() {
    try {
      const [list, meta] = await Promise.all([api.list(), api.info()])
      setTodos(list)
      setInfo(meta)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function onAdd(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    try {
      await api.add(title)
      setTitle('')
      await refresh()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  async function onToggle(id: string) {
    await api.toggle(id).catch((err) => setError(err.message))
    await refresh()
  }

  async function onRemove(id: string) {
    await api.remove(id).catch((err) => setError(err.message))
    await refresh()
  }

  const remaining = todos.filter((t) => !t.done).length

  return (
    <main className="app">
      <header>
        <h1>Accord Todo</h1>
        <p className="muted">
          {remaining} of {todos.length} remaining
        </p>
      </header>

      <form onSubmit={onAdd} className="add">
        <input
          data-testid="todo--title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          autoFocus
        />
        <button data-testid="todo--add" type="submit" disabled={!title.trim()}>
          Add
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <label>
              <input
                data-testid="todo--toggle"
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
              />
              <span>{todo.title}</span>
            </label>
            <button data-testid="todo--remove" onClick={() => onRemove(todo.id)} aria-label="Remove">
              ×
            </button>
          </li>
        ))}
        {todos.length === 0 && !error && <li className="muted">Nothing yet. Add your first todo.</li>}
      </ul>

      <footer className="muted">
        {info ? (
          <>
            served by <code>{info.hostname}</code> · revision <code>{info.revision}</code> · up {info.uptimeSeconds}s
          </>
        ) : (
          'connecting…'
        )}
      </footer>
    </main>
  )
}
