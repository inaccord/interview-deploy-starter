export type Todo = {
  id: string
  title: string
  done: boolean
  createdAt: string
}

export type Info = {
  hostname: string
  uptimeSeconds: number
  revision: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { headers: { 'content-type': 'application/json' }, ...init })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `${res.status} ${res.statusText}`)
  }
  return res.status === 204 ? (undefined as T) : res.json()
}

export const api = {
  info: () => request<Info>('/api/info'),
  list: () => request<Todo[]>('/api/todos'),
  add: (title: string) => request<Todo>('/api/todos', { method: 'POST', body: JSON.stringify({ title }) }),
  toggle: (id: string) => request<Todo>(`/api/todos/${id}`, { method: 'PATCH' }),
  remove: (id: string) => request<void>(`/api/todos/${id}`, { method: 'DELETE' })
}
