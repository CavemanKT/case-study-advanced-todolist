import nc from 'next-connect'
import { TodoItem } from '@/db/models'

const todoTodoItemsMultiUpdate = async (req, res) => {
  const { itemIdArr, id, someListId } = req.query
  const { currentTodo } = res
  // console.log(req, res)
  const newArr = itemIdArr.split(',')
  console.log(newArr, currentTodo, id, someListId)

  for (let i = 0; i < newArr.length; i++) {
    await TodoItem.update({ TodoId: someListId }, {
      where: {
        id: newArr[i]
      }
    })
  }

  const todoItems = await TodoItem.findAll({
    where: {
      TodoId: id
    }
  })

  console.log(todoItems)
  res.status(204).json()
}

export default nc()
  .use(todoTodoItemsMultiUpdate)
