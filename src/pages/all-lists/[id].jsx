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
import RefreshIcon from '@mui/icons-material/Refresh'

import withPrivateRoute from '@/_hocs/withPrivateRoute'

import { Todo } from '@/db/models'

import useTodo from '@/_hooks/todo'
import useTodos from '@/_hooks/todos'

import Layout from '@/components/layouts/Layout'
import CompsLoading from '@/components/Loading'
import CompsError from '@/components/Error'
import CompsModalsTodosUpdate from '@/components/modals/todos/update'
import CompsModalsTodoItemsCreate from '@/components/modals/todo-items/create'
import CompsModalsTodoItemsUpdate from '@/components/modals/todo-items/update'

export function CompsTodoItems() {
  const [selected, setSelected] = useState(false)

  const [openTodosUpdate, setOpenTodosUpdate] = useState(false)
  const [openTodoItemsCreate, setOpenTodoItemsCreate] = useState(false)
  const [openTodoItemsUpdate, setOpenTodoItemsUpdate] = useState(false)
  const [selectedTodoItem, setSelectedTodoItem] = useState({})
  const { query: { id } } = useRouter()

  const {
    todo, isLoading, isError, errorMessage, todoItemsIds,
    updateTodo, destroyTodo, createTodoItem, updateTodoItem, destroyTodoItem,
    apiTodoItemsMultiDelete, apiUpdateItemTodoId, apiTodoItemsGet,
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

  const handleSelectList = (event) => {
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

  const handleRefresh = () => {
    apiTodoItemsGet()
    console.log('refresh')
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

          {/* multi-selection feature */}
          <span className="d-flex justify-content-start">
            {/* multi-select button */}
            <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected)
                setShow(selectedFromHook)
              }}
              className="d-inline"
            >
              <CheckIcon />
              select
            </ToggleButton>
            <Button onClick={handleRefresh}>
              <RefreshIcon color="primary" />
            </Button>

            {
              selected && (
                <>
                  {/* button for multi-select & delete */}
                  <button
                    type="button"
                    className="btn btn-danger ms-5"
                    onClick={() => {
                      handleMultiDelete()
                      setItemIdArr([])
                    }}
                  >Delete tasks
                  </button>
                  <div ref={ref} className="notification-section">
                    {/* button for multi-select & move tasks to another list */}
                    <button
                      type="button"
                      className="btn btn-primary ms-5 h-100"
                      onClick={() => {
                        handleSelectList(event)
                        setSomeList(null)
                      }}
                    >Move to another list
                    </button>
                    {/* overlay for showing choices of other lists */}
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
                              onClick={() => {
                                handleConfirmMovingToAnotherList()
                                setShow(selectedFromHook)
                              }}
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
          </span>

          {/* todo list feature */}
          <h1>{todo?.name}</h1>
          <div className="btn-group">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() => setOpenTodosUpdate(true)}
            >Edit the name</button>
            <button
              className="btn btn-danger btn-sm"
              type="button"
              onClick={() => destroyTodo()}
            >Delete the list</button>
          </div>
        </header>

        <main className="text-center">
          <section className="mb-3">
            <h3>Tasks</h3>
            <button
              className="btn btn-success btn-sm"
              type="button"
              onClick={() => setOpenTodoItemsCreate(true)}
            >Create Task</button>
          </section>

          <section>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {
                todo?.TodoItems.map((item) => (
                  <div key={item?.id} className="col">
                    <div className="card">
                      {
                    selected && (
                    <Checkbox
                      value={item?.id}
                      onChange={() => handleMultiSelectionChange(event, item?.id)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    )
                  }

                      <div className={item?.complete ? 'text-decoration-line-through card-body' : 'card-body'}>
                        <div className="card-title">
                          title: {item?.name}
                        </div>
                        <div className="card-body">
                          <div>
                            description: {item?.description}
                          </div>
                          <div className={item?.overdue ? 'overdueColorChange' : ''}>
                            <span className={item?.overdue ? 'deadlineFont' : ''}>
                              deadline: &nbsp; &nbsp;
                              {`${String(item?.deadline)?.split('T')[0]} ${String(item?.deadline)?.split('T')[1].split('+')[0]}`}
                            </span>
                            {
                          item?.overdue ? <span className={item?.overdue ? 'overdueColor' : ''}>&nbsp; &nbsp; overdue</span> : ''
                        }
                          </div>
                        </div>
                      </div>
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
                    </div>
                  </div>
                ))
              }
            </div>
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

function PageTasks({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <CompsTodoItems />
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

export default withPrivateRoute(PageTasks)
