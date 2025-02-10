/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../styles/Login.module.css'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Api } from '../src/config/Config'
import * as Yup from 'yup'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { reactLocalStorage } from 'reactjs-localstorage'
import localStorage from 'local-storage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ChangePassword() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
    onSubmit: async (values) => {
      try {
        await axios
          .post(
            // Api?.CHANGE_PASSWORD
            `${baseURL}/api/auth/change-password`,

            values,
            {
              headers: {
                Authorization:
                  'Bearer ' +
                  localStorage.get('loginAuth')?.authorisation?.token,
              },
            },
          )
          .then((response) => {
            router.push('/login')
          })
          .catch((error) => {
            toast.error(error)
          })
      } catch (error) {
        toast.error('Failed to Change Password.')
      }
    },
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
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.container}>
          <Topbar isLogin={true} />
          <ToastContainer className="tost" />

          <div className={styles.line}></div>

          <div className={styles.center_main_div}>
            <div className={styles.sub_main_div_left}>
              <h1 className={styles.signup_white_color}>
                Change Your Password
              </h1>
              <h3 className={styles.signup_white_color}>
                Instructions: Create a stronger, more secure password for your
                account.
              </h3>
            </div>

            <div className={styles.sub_main_div_right}>
              <div className={styles.right_div_box}>
                <label
                  className={styles.signup_white_color}
                  htmlFor="old_password"
                >
                  Old Password
                </label>
                <input
                  id="old_password"
                  name="old_password"
                  className={styles.input}
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.old_password}
                />
                {formik.touched.old_password && formik.errors.old_password ? (
                  <div>{formik.errors.old_password}</div>
                ) : null}

                <label className={styles.signup_white_color} htmlFor="password">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  className={styles.input}
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}

                <label
                  className={styles.signup_white_color}
                  htmlFor="password_confirmation"
                >
                  Confirm Password
                </label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  className={styles.input}
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password_confirmation}
                />
                {formik.touched.password_confirmation &&
                formik.errors.password_confirmation ? (
                  <div>{formik.errors.password_confirmation}</div>
                ) : null}

                <div className={styles.btn_div}>
                  <button className={styles.login_btn} type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  )
}
export default ChangePassword
