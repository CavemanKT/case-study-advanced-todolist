import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const RenderForm = ({ errors, isSubmitting }) => (
  <Form>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <Field
        id="name"
        name="name"
        type="text"
        className={`form-control ${errors.name && 'is-invalid'}`}
      />
      <ErrorMessage component="div" name="name" className="invalid-feedback" />
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <Field
        id="description"
        name="description"
        type="text"
        className={`form-control ${errors.name && 'is-invalid'}`}
      />
      <ErrorMessage component="div" name="description" className="invalid-feedback" />
    </div>
    <div className="mb-3">
      <label htmlFor="deadline" className="form-label">Deadline</label>
      <Field
        id="deadline"
        name="deadline"
        type="datetime-local"
        className={`form-control ${errors.name && 'is-invalid'}`}
      />
      <ErrorMessage component="div" name="date" className="invalid-feedback" />
    </div>
    <div className="form-check">
      <Field
        id="complete"
        name="complete"
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label" htmlFor="complete">completed</label>
    </div>

    <div className="text-end">
      <button
        disabled={isSubmitting}
        className="btn btn-success"
        type="submit"
      >Submit</button>
    </div>
  </Form>
)

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required')
})

export default function CompsFormsTodoItemsChange({ onSubmit, initialValues }) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      component={RenderForm}
    />
  )
}
