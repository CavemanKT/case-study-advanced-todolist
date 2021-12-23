import { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import produce from 'immer'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function useTodo(id) {
  const router = useRouter()
  const url = id ? `/api/todos/${id}` : String(null)
  const { data, error, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false,
    refreshInterval: 1000,
    revalidateOnFocus: true
  })
  const [todoItemsIds, setTodoItemsIds] = useState([])

  const [selected, setSelected] = useState(false)

  const updateTodo = (values) => (new Promise((resolve, reject) => {
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
    }).then(() => {
      router.push('/all-lists')
    })
  }

  const createTodoItem = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `/api/todos/${id}/todo-items`,
      data: values,
      withCredentials: true
    }).then((resp) => {
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

  const apiTodoItemsMultiDelete = (itemIdArr) => (new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: `/api/todos/${id}/todo-items/todo-items-multi-select/${itemIdArr}/deleteItems`,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate()
    }).catch((err) => {
      reject(err)
    }).finally(() => {
      setSelected(false)
    })
  }))

  const apiUpdateItemTodoId = (itemIdArr, someListId) => (new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: `/api/todos/${id}/todo-items/todo-items-multi-select/${itemIdArr}/movingItems/${someListId}`,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate()
    }).catch((err) => {
      reject(err)
    }).finally(() => {
      setSelected(false)
    })
  }))

  const apiTodoItemsGet = () => (new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(resp.data)
    }).catch((err) => {
      reject(err)
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
    destroyTodoItem,
    apiTodoItemsMultiDelete,
    apiUpdateItemTodoId,
    apiTodoItemsGet,
    selectedFromHook: selected
  }
}
