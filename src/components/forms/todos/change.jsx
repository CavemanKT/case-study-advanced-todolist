import { Formik, Form, Field, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

const RenderForm = ({ errors, onSubmit, isSubmitting }) => (
  <Form>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">name</label>
      <Field
        id="name"
        name="name"
        type="text"
        className={`form-control ${errors.name && 'is-invalid'}`}
      />
      <ErrorMessage component="div" name="name" className="invalid-feedback" />
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

const CompsFormsTodosChange = ({ onSubmit, initialValues }) => (
  <Formik
    onSubmit={onSubmit}
    initialValues={initialValues}
    validationSchema={validationSchema}
    component={RenderForm}
  />
)
CompsFormsTodosChange.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape().isRequired
}
export default CompsFormsTodosChange
