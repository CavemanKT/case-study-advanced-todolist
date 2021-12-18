import nc from 'next-connect'

const todosUpdate = async (req, res) => {
  const { currentTodo } = res

  await currentTodo.update(req.body, {
    fields: ['name']
  })
  await currentTodo.reload()

  res.status(200).json({ todo: currentTodo })
}

export default nc()
  .use(todosUpdate)
