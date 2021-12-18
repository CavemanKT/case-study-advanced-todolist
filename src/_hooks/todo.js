import { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import produce from 'immer'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function useTodo(id) {
  const router = useRouter()
  const url = id ? `/api/todos/${id}` : null
  const { data, error, mutate } = useSWR(url, fetcher)
  const [todoItemsIds, setTodoItemsIds] = useState([])

  const updateTodo = (values) => (new Promise((resolve, reject) => {
    console.log(values)
    axios({
      method: 'PUT',
      url: `/api/todos/${id}`,
      data: values,
      withCredentials: true
    }).then((resp) => {
      resolve()
      mutate(resp.data)
    }).catch(() => {
      reject()
    })
  }))

  const destroyTodo = () => {
    axios({
      method: 'DELETE',
      url: `/api/todos/${id}`,
      withCredentials: true
    }).then((resp) => {
      router.push('/all-lists')
    })
  }

  const createTodoItem = (values) => (new Promise((resolve, reject) => {
    console.log('createTodoItem', values)
    axios({
      method: 'POST',
      url: `/api/todos/${id}/todo-items`,
      data: values,
      withCredentials: true
    }).then((resp) => {
      console.log('createTodoItem-resp', resp)

      resolve()
      mutate(produce(data, (draft) => {
        draft.todo.TodoItems.push(resp.data.todoItem)
      }))
    }).catch(() => {
      reject()
    })
  }))

  const updateTodoItem = (values) => (new Promise((resolve, reject) => {
    setTodoItemsIds(produce(todoItemsIds, (draft) => {
      draft.push(values.id)
    }))
    console.log('itemId:', values.id)
    axios({
      method: 'PUT',
      url: `/api/todos/${id}/todo-items/${values.id}`,
      data: values,
      withCredentials: true
    }).then((resp) => {
      resolve()
      mutate(produce(data, (draft) => {
        const index = draft.todo.TodoItems.findIndex((item) => item.id === values.id)
        if (index !== -1) draft.todo.TodoItems[index] = resp.data.todoItem
      }))
    }).catch(() => {
      reject()
    }).finally(() => {
      setTodoItemsIds(produce(todoItemsIds, (draft) => {
        const index = draft.findIndex((itemId) => itemId === values.id)
        if (index !== -1) draft.splice(index, 1)
      }))
    })
  }))

  const destroyTodoItem = (values) => (new Promise((resolve, reject) => {
    setTodoItemsIds(produce(todoItemsIds, (draft) => {
      draft.push(values.id)
    }))
    console.log('itemId:', values.id)
    axios({
      method: 'DELETE',
      url: `/api/todos/${id}/todo-items/${values.id}`
    }).then(() => {
      resolve()
      mutate(produce(data, (draft) => {
        const index = draft.todo.TodoItems.findIndex((item) => item.id === values.id)
        if (index !== -1) draft.todo.TodoItems.splice(index, 1)
      }))
    }).catch(() => {
      reject()
    }).finally(() => {
      setTodoItemsIds(produce(todoItemsIds, (draft) => {
        const index = draft.findIndex((itemId) => itemId === values.id)
        if (index !== -1) draft.splice(index, 1)
      }))
    })
  }))

  return {
    todo: data?.todo,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    todoItemsIds,
    updateTodo,
    destroyTodo,
    createTodoItem,
    updateTodoItem,
    destroyTodoItem
  }
}
