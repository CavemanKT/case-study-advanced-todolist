import nc from 'next-connect'

const todosShow = (req, res) => {
  const { currentTodo } = res

  res.status(200).json({ todo: currentTodo })
}

export default nc()
  .use(todosShow)
