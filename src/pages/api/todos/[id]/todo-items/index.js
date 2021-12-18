import nc from 'next-connect'

import getCurrentTodo from '@/api/helpers/getCurrentTodo'

import todoTodoItemsCreate from '@/api/controllers/todos/todo-items/create'

export default nc()
  .use(getCurrentTodo)
  .post(todoTodoItemsCreate)
