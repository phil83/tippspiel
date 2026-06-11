import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  async function loadTodos() {
    const res = await fetch('/api/todos')
    const body = await res.json()
    if (!res.ok) throw new Error(body.error || 'Failed to load todos')
    setTodos(body.todos)
  }

  async function addTodo(event) {
    event.preventDefault()
    setError('')

    const value = text.trim()
    if (!value) return

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: value })
    })

    const body = await res.json()
    if (!res.ok) {
      setError(body.error || 'Failed to add todo')
      return
    }

    setText('')
    await loadTodos()
  }

  useEffect(() => {
    loadTodos().catch((err) => setError(err.message))
  }, [])

  return (
    <main>
      <h1>Cloudflare Pages + React + D1</h1>
      <p>A minimal todo app using a Pages Function as the backend API.</p>

      <form onSubmit={addTodo}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
