import nc from 'next-connect'
import getCurrentTodo from '@/api/helpers/getCurrentTodo'

import todoItemsMultiDelete from '@/api/controllers/todos/todo-items/multi-destroy'

export default nc()
  .use(getCurrentTodo)
  .delete(todoItemsMultiDelete)
