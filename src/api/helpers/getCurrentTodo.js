import { Todo } from '@/db/models'

const getCurrentTodo = async (req, res, next) => {
  const { query: { id } } = req

  const currentTodo = await Todo.findOne({
    where: {
      id: Number(id) || 0
    },
    include: Todo.TodoItems
  })

  if (!currentTodo) return res.status(404).json({ message: 'Todo Not Found' })
  res.currentTodo = currentTodo

  return next()
}

export default getCurrentTodo
