import nc from 'next-connect'

import getCurrentTodo from '@/api/helpers/getCurrentTodo'
import getCurrentTodoItem from '@/api/helpers/getCurrentTodoItem'

import todoTodoItemsUpdate from '@/api/controllers/todos/todo-items/update'
import todoTodoItemsDestroy from '@/api/controllers/todos/todo-items/destroy'

export default nc()
  .use(getCurrentTodo)
  .use(getCurrentTodoItem)
  .put(todoTodoItemsUpdate)
  .delete(todoTodoItemsDestroy)
