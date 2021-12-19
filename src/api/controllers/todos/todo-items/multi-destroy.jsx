import nc from 'next-connect'
import { TodoItem } from '@/db/models'

const todoTodoItemsMultiDestroy = async (req, res) => {
  const { arr, id } = req.query
  const newArr = arr.split(',')
  console.log(newArr)

  for (let i = 0; i < newArr.length; i++) {
    await TodoItem.destroy({
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
  res.status(204).json({ todoItems })
}

export default nc()
  .use(todoTodoItemsMultiDestroy)
