/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import useTodos from '@/_hooks/todos'

import Layout from '@/components/layouts/Layout'
import CompsLoading from '@/components/Loading'
import CompsError from '@/components/Error'
import CompsModalsTodosCreate from '@/components/modals/todos/create'

import withPrivateRoute from '@/_hocs/withPrivateRoute'

const allLists = () => {
  const [openTodosCreate, setTodosCreate] = useState(false)

  const { todos, isLoading, isError, errorMessage, createTodo } = useTodos()

  const handleCreate = (values) => {
    createTodo(values).then(() => {
      setTodosCreate(false)
    })
  }
  if (isLoading) return <CompsLoading />
  if (isError) return <CompsError message={errorMessage} />
  return (
    <Layout>
      <Head>
        <title>Todo lists</title>
      </Head>
      <div className="container my-3">
        <header className="text-center mb-3">
          <h1>Todo Lists</h1>
          <div className="btn-group">
            <button
              className="btn btn-success btn-sm"
              type="button"
              onClick={() => setTodosCreate(true)}
            >New Todo List</button>
          </div>
        </header>

        <main className="text-center">
          {
            todos.map((todo) => (
              <div key={todo?.id}>
                <Link href={`/all-lists/${todo?.id}`}>
                  <a>{todo?.name}</a>
                </Link>
              </div>
            ))
          }
        </main>

        <CompsModalsTodosCreate
          show={openTodosCreate}
          handleClose={() => setTodosCreate(false)}
          onSubmit={handleCreate}
        />
      </div>
    </Layout>
  )
}

export default withPrivateRoute(allLists)
