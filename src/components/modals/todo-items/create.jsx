import Modal from 'react-bootstrap/Modal'

import CompsFormsTodoItemsChange from '@/components/forms/todo-items/change'

export default function CompsModalsTodoItemsCreate({ show, handleClose, onSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Todo Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CompsFormsTodoItemsChange
          onSubmit={onSubmit}
          initialValues={{
            name: '',
            description: '',
            deadline: '',
            complete: false
          }}
        />
      </Modal.Body>
    </Modal>
  )
}
