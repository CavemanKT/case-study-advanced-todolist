import nc from 'next-connect'

const todosDestroy = async (req, res) => {
  const { currentTodo } = res

  await currentTodo.destroy()

  res.status(204).json()
}

export default nc()
  .use(todosDestroy)
