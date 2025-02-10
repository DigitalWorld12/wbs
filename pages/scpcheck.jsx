import React from 'react'
import { useFormik } from 'formik'

const ChangePasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
    onSubmit: (values) => {},
    validate: (values) => {
      const errors = {}

      if (values.old_password.length < 8) {
        errors.old_password = 'Old password must be at least 8 characters.'
      } else if (
        !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/.test(values.old_password)
      ) {
        errors.old_password =
          'Old password must contain at least one capital letter and one number.'
      }

      if (values.password.length < 8) {
        errors.password = 'New password must be at least 8 characters.'
      } else if (
        !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/.test(values.password)
      ) {
        errors.password =
          'New password must contain at least one capital letter and one number.'
      }

      if (
        values.password_confirmation.length < 8 ||
        values.password_confirmation !== values.password
      ) {
        errors.password_confirmation =
          'Password confirmation must be at least 8 characters.'
      } else if (
        !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/.test(
          values.password_confirmation,
        )
      ) {
        errors.password_confirmation =
          'Password confirmation must contain at least one capital letter and one number.'
      }

      return errors
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="old_password">Old Password</label>
      <input
        id="old_password"
        name="old_password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.old_password}
      />
      {formik.touched.old_password && formik.errors.old_password ? (
        <div>{formik.errors.old_password}</div>
      ) : null}

      <label htmlFor="password">New Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <label htmlFor="password_confirmation">Confirm Password</label>
      <input
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password_confirmation}
      />
      {formik.touched.password_confirmation &&
      formik.errors.password_confirmation ? (
        <div>{formik.errors.password_confirmation}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  )
}

export default ChangePasswordForm
