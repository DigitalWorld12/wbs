/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../styles/Login.module.css'
import Head from 'next/head'

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
import { height } from '@mui/system'
import Image from 'next/image'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { VisibilityOffSharp } from '@mui/icons-material'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function login() {
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
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
          if (response.data?.user?.user_type === 'agency') {
            getArtistDataMultiple(response?.data)
          } else {
            getArtistData(response?.data)
          }

          console.log(response.data?.user?.user_type, 'token')
          const image = localStorage.get('loginAuth', response?.data).user
            ?.user_image
          image ? router.push('/') : router.push('/edit_profile')
          return null
        } else {
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message)
      })
  }

  // -----------------------------------------------

  // ----------------------------------------------
  const getArtistDataMultiple = async () => {
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token
    await axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + '/api/artist/artists-profiles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        reactLocalStorage.setObject('isArtistMultple', response?.data)
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // alert("token expire");
          toast.error('Unauthorized')
          reactLocalStorage?.remove('loginAuth')
          router.push('/login')
        } else {
          console.error('Error: ', error)
        }
      })
  }
  const getArtistData = async () => {
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId =
      artistdata?.data?.id !== undefined ? artistdata?.data?.id : null

    const userId = data?.user?.id

    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?user_id=${userId}`,

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
    // <>
    <div className={styles.container}>
      <ToastContainer className="tost" />

      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
      </Head>

      <div className={styles.center_main_div}>
        <div className={styles.sub_main_div_left}>
          <Link href="/">
            <Image
              className={styles.logo}
              src={require('../src/Asset/logo/logo-sign-up.png')}
              alt="Picture of the author"
            />
          </Link>
          <h1 className={styles.signup_white_color}>Log In</h1>
          <h3 className={styles.signup_white_color}>
            Access your account by entering your login details.
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

            <div className={styles.signup_marginleft_20}>
              <p className={styles.signup_white_color}>Your Password</p>
              <div className={styles.password_parent}>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  className={styles.input1}
                  value={values.password}
                  onChange={handleChange}
                />
                <span
                  className={styles.login_color_red}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
              <span className={styles.signup_color_red_marign_top_50}>
                {errors.password}
              </span>
            </div>

            <div className={styles.btn_div}>
              <button
                type="submit"
                className={styles.login_btn}
                onClick={handleSubmit}
              >
                Log In
              </button>
              <Link href="forgatepassword" className={styles.underline_txt}>
                Forgot Your Password
              </Link>
            </div>
          </div>
          <Link href="/signup">
            <button create_acc_btn className={styles.create_acc_btn}>
              Create an account
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default login
