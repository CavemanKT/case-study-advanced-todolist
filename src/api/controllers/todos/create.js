import nc from 'next-connect'
import { Todo } from '@/db/models'

const todosCreate = async (req, res) => {
  console.log('todosCreate,back-end')
  const todo = await Todo.create(req.body, {
    fields: ['name']
  })

  res.status(200).json({ todo })
}

export default nc()
  .use(todosCreate)
