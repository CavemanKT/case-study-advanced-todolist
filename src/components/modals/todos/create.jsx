import Modal from 'react-bootstrap/Modal'

import CompsFormsTodosChange from '@/components/forms/todos/change'

export default function CompsModalsTodosCreate({ show, handleClose, onSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CompsFormsTodosChange
          onSubmit={onSubmit}
          initialValues={{
            name: ''
          }}
        />
      </Modal.Body>
    </Modal>
  )
}
