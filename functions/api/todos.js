export async function onRequestGet(context) {
  try {
    const { results } = await context.env.DB
      .prepare('SELECT id, text, created_at FROM todos ORDER BY id DESC')
      .all()

    return Response.json({ todos: results })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function onRequestPost(context) {
  try {
    const { text } = await context.request.json()

    if (!text || typeof text !== 'string') {
      return Response.json({ error: 'Text is required' }, { status: 400 })
    }

    await context.env.DB
      .prepare('INSERT INTO todos (text) VALUES (?)')
      .bind(text.trim())
      .run()

    return Response.json({ ok: true }, { status: 201 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
