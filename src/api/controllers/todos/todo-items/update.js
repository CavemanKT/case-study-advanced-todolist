import nc from 'next-connect'

const todoTodoItemsUpdate = async (req, res) => {
  const { currentTodoItem } = res

  await currentTodoItem.update(req.body, {
    fields: ['name', 'checked']
  })
  await currentTodoItem.reload()

  res.status(200).json({ todoItem: currentTodoItem })
}

export default nc()
  .use(todoTodoItemsUpdate)
