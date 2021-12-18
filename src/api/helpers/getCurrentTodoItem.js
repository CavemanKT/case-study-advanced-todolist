import { TodoItem } from '@/db/models'

const getCurrentTodo = async (req, res, next) => {
  const { query: { itemId } } = req
  const { currentTodo } = res

  const currentTodoItem = await TodoItem.findOne({
    where: {
      id: Number(itemId) || 0,
      TodoId: currentTodo.id
    }
  })

  if (!currentTodoItem) return res.status(404).json({ message: 'Todo Item Not Found' })
  res.currentTodoItem = currentTodoItem

  return next()
}

export default getCurrentTodo
