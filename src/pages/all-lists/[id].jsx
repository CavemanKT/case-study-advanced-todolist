import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { SWRConfig } from 'swr'

// React bootstrap || React Component
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import Button from '@mui/material/Button'
import { Col, Row, Form } from 'react-bootstrap'

// material UI package
import CheckIcon from '@mui/icons-material/Check'
import ToggleButton from '@mui/material/ToggleButton'
import Checkbox from '@mui/material/Checkbox'

import { Todo } from '@/db/models'

import useTodo from '@/_hooks/todo'
import useTodos from '@/_hooks/todos'

import Layout from '@/components/layouts/Layout'
import CompsLoading from '@/components/Loading'
import CompsError from '@/components/Error'
import CompsModalsTodosUpdate from '@/components/modals/todos/update'
import CompsModalsTodoItemsCreate from '@/components/modals/todo-items/create'
import CompsModalsTodoItemsUpdate from '@/components/modals/todo-items/update'

export function RenderSWRSelfShow() {
  const [selected, setSelected] = useState(false)

  const [openTodosUpdate, setOpenTodosUpdate] = useState(false)
  const [openTodoItemsCreate, setOpenTodoItemsCreate] = useState(false)
  const [openTodoItemsUpdate, setOpenTodoItemsUpdate] = useState(false)
  const [selectedTodoItem, setSelectedTodoItem] = useState({})
  const { query: { id } } = useRouter()

  const {
    todo, isLoading, isError, errorMessage, todoItemsIds,
    updateTodo, destroyTodo, createTodoItem, updateTodoItem, destroyTodoItem,
    apiTodoItemsMultiDelete, apiUpdateItemTodoId,
    selectedFromHook
  } = useTodo(id)
  const { todos, isLoading: isTodosLoading, isError: isTodosError, errorMessage: isTodosErrorMessage } = useTodos()

  const [itemIdArr, setItemIdArr] = useState([])
  const [someList, setSomeList] = useState(null)

  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  // multi-selection handler
  const handleMultiSelectionChange = (event, todoItemId) => {
    if (event.target.checked && !itemIdArr.includes(`${todoItemId}`)) {
      console.log(todoItemId, event.target.checked)
      setItemIdArr([...itemIdArr, event.target.value])
    } else {
      console.log(todoItemId, event.target.checked)
      setItemIdArr(itemIdArr.filter((itemId) => itemId !== event.target.value))
    }
    console.log(itemIdArr)
  }

  const handleMultiDelete = () => {
    if (itemIdArr.length > 0) {
      apiTodoItemsMultiDelete(itemIdArr).then(() => {
        setSelected(selectedFromHook)
        setItemIdArr([])
      })
    }
  }

  const handleSelectListToMoveItem = (event) => {
    setShow(!show)
    setTarget(event.target)
  }

  const handleRadioValue = (event) => {
    console.log(event.target.checked, event.target.value)
    setSomeList(event.target.value)
  }

  const handleConfirmMovingToAnotherList = () => {
    if (itemIdArr.length > 0 && someList !== null) {
      apiUpdateItemTodoId(itemIdArr, someList)
    }
  }

  if (isLoading) return <CompsLoading />
  if (isError) return <CompsError message={errorMessage} />
  return (
    <Layout>
      <div className="container my-3">
        <Head>
          <title>Todo tasks | {todo?.name}</title>
        </Head>

        <header className="text-center mb-3">

          {/* multi-selection button */}
          <div className="d-flex justify-content-start">
            <span className="d-inline align-self-center" />
            <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected)
              }}
              className="d-inline"
            >
              <CheckIcon />
              select
            </ToggleButton>
            {
              selected && (
                <>
                  <button
                    type="button"
                    className="btn btn-danger ms-5"
                    onClick={() => {
                      handleMultiDelete()
                      setItemIdArr([])
                    }}
                  >Delete
                  </button>
                  <div ref={ref} className="notification-section">

                    <button
                      type="button"
                      className="btn btn-primary ms-5"
                      onClick={() => {
                        handleSelectListToMoveItem(event)
                        setSomeList(null)
                      }}
                    >Move to another list
                    </button>
                    <Overlay
                      show={show}
                      target={target}
                      placement="bottom"
                      container={ref}
                      containerPadding={20}
                      className="notification-container"
                    >
                      <Popover id="popover-contained" className="pop-over-position position-absolute">
                        <Popover.Header as="h3">
                          Select one list
                        </Popover.Header>
                        <Popover.Body>
                          <Form>
                            <fieldset>
                              <Form.Group as={Row} className="mb-1">
                                <Col sm={10}>
                                  {
                                    todos.map((someTodoList, i) => (
                                      <div className="m-1">
                                        <Form.Check
                                          label={someTodoList.name}
                                          type="radio"
                                          id={someTodoList.id}
                                          name="radio"
                                          value={`${someTodoList.id}`}
                                          onChange={handleRadioValue}
                                        />
                                      </div>
                                    ))
                                  }
                                </Col>
                              </Form.Group>
                            </fieldset>
                          </Form>
                          <div>
                            <Button
                              variant="contained"
                              size="medium"
                              className="mt-4"
                              onClick={handleConfirmMovingToAnotherList}
                            >Confirm
                            </Button>
                          </div>
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                </>
              )
            }

          </div>

          {/* todo list feature */}
          <h1>{todo?.name}</h1>
          <div className="btn-group">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() => setOpenTodosUpdate(true)}
            >Edit</button>
            <button
              className="btn btn-danger btn-sm"
              type="button"
              onClick={() => destroyTodo()}
            >Delete</button>
          </div>
        </header>

        <main className="text-center">
          <section className="mb-3">
            <h3>Todo Items</h3>
            <button
              className="btn btn-success btn-sm"
              type="button"
              onClick={() => setOpenTodoItemsCreate(true)}
            >Create Item</button>
          </section>

          <section>
            <ul className="list-group">
              {
                todo?.TodoItems.map((item) => (
                  <li key={item?.id} className="list-group-item">
                    {
                    selected && (
                    <Checkbox
                      value={item?.id}
                      onChange={() => handleMultiSelectionChange(event, item?.id)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    )
                  }
                    <span className={item?.complete ? 'text-decoration-line-through' : ''}>
                      <div>
                        title: {item?.name}
                      </div>
                      <div>
                        description: {item?.description}
                      </div>
                      <div>
                        deadline: {String(item?.deadline)?.split('T')[0]}
                      </div>
                    </span>
                    {' '}
                    <div className="btn-group">
                      {item?.complete ? (
                        <button
                          className="btn btn-warning btn-sm"
                          type="button"
                          disabled={todoItemsIds.includes(item?.id)}
                          onClick={() => {
                            updateTodoItem({
                              ...item,
                              complete: !item?.complete
                            })
                          }}
                        >completed</button>
                      ) : (
                        <button
                          className="btn btn-warning btn-sm"
                          type="button"
                          disabled={todoItemsIds.includes(item?.id)}
                          onClick={() => {
                            updateTodoItem({
                              ...item,
                              complete: !item?.complete
                            })
                          }}
                        >not yet complete</button>
                      )}

                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => {
                          setSelectedTodoItem(item)
                          setOpenTodoItemsUpdate(true)
                        }}
                      >Edit</button>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        disabled={todoItemsIds.includes(item?.id)}
                        onClick={() => {
                          destroyTodoItem(item)
                        }}
                      >Delete</button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </section>
        </main>

        {/* modals */}
        <CompsModalsTodosUpdate
          show={openTodosUpdate}
          initialValues={todo}
          handleClose={() => setOpenTodosUpdate(false)}
          onSubmit={(values, actions) => {
            updateTodo(values).then(() => {
              setOpenTodosUpdate(false)
            }).catch(() => {
              actions.setSubmitting(false)
            })
          }}
        />

        <CompsModalsTodoItemsCreate
          show={openTodoItemsCreate}
          handleClose={() => setOpenTodoItemsCreate(false)}
          onSubmit={(values, actions) => {
            createTodoItem(values).then(() => {
              setOpenTodoItemsCreate(false)
            }).catch(() => {
              actions.setSubmitting(false)
            })
          }}
        />

        <CompsModalsTodoItemsUpdate
          show={openTodoItemsUpdate}
          initialValues={selectedTodoItem}
          handleClose={() => setOpenTodoItemsUpdate(false)}
          onSubmit={(values, actions) => {
            updateTodoItem(values).then(() => {
              setOpenTodoItemsUpdate(false)
            }).catch(() => {
              actions.setSubmitting(false)
            })
          }}
        />
      </div>
    </Layout>
  )
}

export default function SWRShow({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <RenderSWRSelfShow />
    </SWRConfig>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const todo = await Todo.findOne({
    where: {
      id: Number(params?.id) || 0
    },
    include: Todo?.TodoItems
  })

  if (!todo) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      fallback: {
        [`/api/todos/${params?.id}`]: { todo: todo.toJSON() }
      }
    }
  }
}
