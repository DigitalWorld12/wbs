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

function ForgatePassword() {
  const router = useRouter()
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email*')
      .required('Email Address is required*'),
    password: Yup.string()
      .required('Password is required*')
      .min(8, 'Password must be at least 8 characters*')
      .max(40, 'Password must not exceed 40 characters*'),
  })
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const onSubmit = (data) => {
    axios
      .post(
        // Api?.LOGIN
        `${baseURL}/api/auth/login`,
        {
          email: data?.email,
          password: data?.password,
        },
      )
      .then(function (response) {
        if (response?.data?.status === true) {
          toast.success(response?.data?.message)
          reactLocalStorage.setObject('loginAuth', response?.data)
          getArtistData(response?.data)
          const image = localStorage.get('loginAuth', response?.data).user
            ?.profile_image
          image ? router.push('/') : router.push('/edit_profile')
          return null
        } else {
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message)
      })
  }

  const getArtistData = async () => {
    const data = reactLocalStorage.getObject('loginAuth')
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    const token = data?.authorisation?.token

    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?artist_id=${artistId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        reactLocalStorage.setObject('isArtist', response?.data)
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized')
          reactLocalStorage?.remove('loginAuth')
          router.push('/login')
        } else {
          console.error('Error: ', error)
        }
      })
  }

  const { values, resetForm, handleSubmit, handleChange, errors } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  })
  useEffect(() => {
    reactLocalStorage.clear()
  }, [])
  return (
    <>
      <div className={styles.container}>
        <ToastContainer className="tost" />
        <div className={styles.line}></div>

        <div className={styles.center_main_div}>
          <div className={styles.sub_main_div_left}>
            <h1 className={styles.signup_white_color}>Recent Logins</h1>
            <h3 className={styles.signup_white_color}>
              Click your picture or add an account{' '}
            </h3>
          </div>

          <div className={styles.sub_main_div_right}>
            <div className={styles.right_div_box}>
              <div className={styles.signup_marginleft_20}>
                <p className={styles.signup_white_color}>Your Email</p>
                <input
                  type="text"
                  name="email"
                  className={styles.input}
                  value={values.email}
                  onChange={handleChange}
                />
                <span className={styles.login_color_red}>{errors.email}</span>
              </div>

              <div className={styles.btn_div}>
                <Link href="/">
                  <button className={styles.login_btn} onClick={handleSubmit}>
                    Submit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ForgatePassword
