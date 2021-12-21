import nc from 'next-connect'

const todoTodoItemsCreate = async (req, res) => {
  const { currentTodo } = res

  const todoItem = await currentTodo.createTodoItem(req.body, {
    fields: ['name', 'description', 'complete', 'deadline']
  })

  console.log(todoItem)
  res.status(200).json({ todoItem })
}

export default nc()
  .use(todoTodoItemsCreate)
