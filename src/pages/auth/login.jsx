import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import CompsLayout from '@/components/layouts/Layout'
import useUser from '@/_hooks/user'

const RenderForm = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <Field
        id="email"
        className={`form-control ${(errors.email && touched.email ? ' is-invalid' : '')}`}
        name="email"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="email" />
    </div>

    <div className="form-group">
      <label htmlFor="password">Password</label>
      <Field
        id="password"
        className={`form-control ${(errors.password && touched.password ? ' is-invalid' : '')}`}
        name="password"
        type="password"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="password" />
    </div>

    <button className="btn btn-success mt-3" type="submit" disabled={isSubmitting}>Submit</button>
  </Form>
)
RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

const authLoginSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup.string().min(6).required('Required')
})

const FormsAuthLogin = () => {
  const { apiLogin } = useUser()
  const router = useRouter()

  const handleLoginSubmit = (values) => {
    apiLogin(values).then(() => {
      router.push('/private')
    })
  }
  return (
    <CompsLayout>
      <div className="page-container d-flex justify-content-center mt-5">
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={authLoginSchema}
          onSubmit={handleLoginSubmit}
          component={RenderForm}
        />
      </div>
    </CompsLayout>
  )
}

export default FormsAuthLogin
