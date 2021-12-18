import nc from 'next-connect'

const todoTodoItemsDestroy = async (req, res) => {
  const { currentTodoItem } = res

  await currentTodoItem.destroy()

  res.status(204).json()
}

export default nc()
  .use(todoTodoItemsDestroy)
