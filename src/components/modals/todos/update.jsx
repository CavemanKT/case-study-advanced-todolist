import Modal from 'react-bootstrap/Modal'

import CompsFormsTodosChange from '@/components/forms/todos/change'

export default function CompsModalsTodosUpdate({ show, initialValues, handleClose, onSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CompsFormsTodosChange
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </Modal.Body>
    </Modal>
  )
}
