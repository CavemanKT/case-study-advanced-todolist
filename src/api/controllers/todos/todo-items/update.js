import nc from 'next-connect'

const fs = require('fs')

const todoTodoItemsUpdate = async (req, res) => {
  const { currentTodoItem } = res

  await currentTodoItem.update(req.body, {
    fields: ['name', 'description', 'complete', 'deadline']
  })
  await currentTodoItem.reload()

  const { complete } = currentTodoItem
  if (complete) {
    // send email at this point
    console.log('Send email when today meets the deadline')
    const data = `Here is the email template once you completed the task, currentTodoItem/task: ${currentTodoItem.id}`
    // change the file path before you test please
    fs.writeFile('/home/caveman/Desktop/output.txt', data, (err) => {
      if (err) throw err
    })
  }

  res.status(200).json({ todoItem: currentTodoItem })
}

export default nc()
  .use(todoTodoItemsUpdate)
