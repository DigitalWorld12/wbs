/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../styles/Login.module.css'

import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import * as Yup from 'yup'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Api } from '../src/config/Config'
import OtpInput from 'react-otp-input'
import { useRouter } from 'next/router'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Image from 'next/image'
import GoogleAuth from '../src/components/GoogleAuth/google'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function signup() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const [otp, setOtp] = useState('')
  const [isOtp, setIsOtp] = useState(false)
  const [userId, setUserId] = useState('')
  const [countdown, setCountdown] = useState(120)
  const [showResendButton, setShowResendButton] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userType, setUserType] = useState('user')

  // / Define the startCountdown function
  const startCountdown = () => {
    setCountdown(120)
    setShowResendButton(false)

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 0) {
          setShowResendButton(true)
          clearInterval(timer)
          return 0
        }
        return prevCount - 1
      })
    }, 1000)
  }
  useEffect(() => {
    // Start the countdown when isOtp becomes true
    if (isOtp) {
      startCountdown()
    }
  }, [isOtp])

  const router = useRouter()
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const LoginSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required*')
      .min(3, 'Name must be at least 3 characters*')
      .max(40, 'Name must not exceed 40 characters*')
      .matches(
        /^[A-Za-z]+ [A-Za-z]+$/,
        'Name should contain exactly one space between words',
      ),
    email: Yup.string()
      .email('Must be a valid email*')
      .required('Email Address is required*'),

    password: Yup.string()
      .required('Password is required*')
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/,
        'Password must contain at least 1 capital letter, 1 special character (!@#$%^&*), 1 numerical character, and be at least 10 characters long',
      ),
  })
  const otpHandleChange = (otp) => setOtp(otp)

  const handleOtpComplete = (otpValue) => {}
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const onSubmit = (data) => {
    axios
      .post(
        `${baseURL}/api/auth/check-email`,

        {
          email: data?.email,
        },
      )
      .then(function (response) {
        if (response?.data?.message === 'Email Not Found') {
          axios
            .post(
              // Api?.SIGN_UP,
              `${baseURL}/api/auth/register`,

              {
                name: data?.name,
                email: data?.email,
                password: data?.password,
                contact_number: phoneNumber,
                user_type: userType,
              },
            )
            .then(function (response) {
              if (response?.data?.status === true) {
                console.log(response?.data?.user?.email, 'testing ')
                setUserEmail(response?.data?.user?.email)
                toast.success(response?.data?.message)
                resetForm()
                setIsOtp(true)
                setUserId(response?.data?.user?.id)
              } else if (response?.data?.errors?.email) {
                toast.warn(response?.data?.errors?.email)
              } else if (response?.data?.errors?.password) {
                toast.warn(response?.data?.errors?.password)
              } else {
                toast.warn(response?.data?.errors?.contact_number)
              }
            })
            .catch(function (error) {
              if (error?.response?.data?.errors?.email) {
                toast.error(error?.response?.data?.errors?.email[0])
              } else if (error?.response?.data?.errors?.password) {
                toast.error(error?.response?.data?.errors?.password[0])
              } else if (error?.response?.data?.errors?.contact_number) {
                toast.error(error?.response?.data?.errors?.contact_number[0])
              }
            })
        } else {
          toast.success(response?.data?.message)
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }
  const { values, resetForm, handleSubmit, handleChange, errors } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit,
  })
  const otpVerification = () => {
    axios
      .post(
        // Api?.OTP_VERIFICATION
        `${baseURL}/api/auth/verify-opt`,
        {
          user_id: Number(userId),
          otp_code: Number(otp),
        },
      )
      .then(function (response) {
        if (response?.data?.status === true) {
          toast.success(response?.data?.message)
          router.push('/login')
        } else {
          toast.warn(response?.data?.message)
        }
      })
      .catch(function (error) {
        toast.error(error?.message)
      })
  }

  const resentOtpVerification = () => {
    axios
      .post(`${baseURL}/api/auth/resend-opt`, {
        user_id: userId,
      })
      .then(function (response) {
        if (response?.data?.status === true) {
          toast.success(response?.data?.message)
          setIsOtp(true) // Make sure this sets isOtp to true
          startCountdown() // Restart the countdown
          setShowResendButton(false)
        }
      })
      .catch(function (error) {
        toast.error(error?.message)
      })
  }

  return (
    <>
      <div className={styles.container}>
        <ToastContainer className="tost" />

        <div className={styles.line}></div>

        <div className={styles.center_main_div}>
          <div className={styles.sub_main_div_left}>
            <Link href="/">
              <Image
                className={styles.logo}
                src={require('../src/Asset/logo/logo-sign-up.png')}
                alt="Picture of the author"
              />
            </Link>
            <h1 className={styles.signup_white_color}>Register</h1>
            <h3 className={styles.signup_white_color}>
              Create an account to access all the Features of WBS{' '}
            </h3>
          </div>

          <div className={styles.signup_width_35}>
            <div className={styles.signup_width_100}>
              <div
                className={styles.signup_width_100_height_80}
                style={{
                  display: isOtp ? 'flex' : 'none',
                }}
              >
                <p className={styles.signup_white_color_align_center}>
                  We have sent you One Time Password to your mail.<br></br>{' '}
                  Please Enter OTP
                </p>
                <h3 style={{ color: '#fff' }}>{userEmail ? userEmail : ''}</h3>
                <p className={styles.signup_white_color_align_center}>
                  Seconds : {countdown}
                </p>

                <OtpInput
                  className={styles.signup_otp_input_alignment}
                  value={otp}
                  onChange={otpHandleChange}
                  inputStyle={{
                    borderRadius: '8px',
                    width: '50px',
                    height: '54px',
                    fontSize: '18px',
                    color: '#fff',
                    fontWeight: '400',
                    caretColor: '#fcc100',
                  }}
                  numInputs={6}
                  isInputNum={true}
                  separator={<span>-</span>}
                  autoFocus // Automatically focus on the first input box
                  onComplete={handleOtpComplete} // Call handleOtpComplete when all digits are entered
                  renderInput={(props, index) => (
                    <input
                      {...props}
                      type="number"
                      className={`${styles.signup_otp_input_alignment} ${styles.noSpinButtons}`} // Add the class here
                      maxLength="1" // Limit input to one character
                      key={index}
                      style={{
                        borderRadius: '8px',
                        width: '50px',
                        height: '54px',
                        fontSize: '18px',
                        fontWeight: '400',
                        caretColor: 'blue',
                        background: 'transparent',
                        border: '1px solid white',
                        marginLeft: '5px',
                        marginRight: '5px',
                        ...props.style, // Apply additional styles from the inputStyle prop
                      }}
                    />
                  )}
                />
                <div className={styles.signup_width_100_display_flex_center}>
                  {showResendButton && (
                    <button
                      className={styles.resent_btn}
                      onClick={resentOtpVerification}
                    >
                      Resent OTP
                    </button>
                  )}
                  <button className={styles.otp_btn} onClick={otpVerification}>
                    Verify
                  </button>
                </div>
              </div>

              <div style={{ display: !isOtp ? '' : 'none' }}>
                <div className={styles.signup_marginleft}>
                  <p className={styles.signup_white_color}>Your Full Name</p>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    className={styles.input}
                    onChange={handleChange}
                  />
                  <span className={styles.signup_color_red_marign_top_50}>
                    {errors?.name}
                  </span>
                </div>

                <div className={styles.signup_marginleft}>
                  <p className={styles.signup_white_color}>Your Email</p>
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    className={styles.input}
                    onChange={handleChange}
                  />
                  <span className={styles.signup_color_red_marign_top_50}>
                    {errors.email}
                  </span>
                </div>
                <div className={styles.signup_marginleft}>
                  <p className={styles.signup_white_color}>Your Password</p>
                  <div className={styles.password_parent}>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      value={values.password}
                      className={styles.input1}
                      onChange={handleChange}
                    />
                    <span
                      className={styles.signup_color_red_marign_top_50}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  </div>
                  <span className={styles.signup_color_red_marign_top_50}>
                    {errors.password}
                  </span>
                </div>
                <div className={styles.signup_marginleft_20}>
                  <p className={styles.signup_white_color}>
                    Your Contact Number
                  </p>
                  <PhoneInput
                    className={styles.p_number}
                    placeholder="Enter phone number"
                    withCountryCallingCode
                    value={phoneNumber}
                    defaultCountry="PK"
                    minLength={10}
                    maxLength={15}
                    country="us"
                    onChange={setPhoneNumber}
                    inputStyle={{
                      background: 'lightblue',
                    }}
                  />
                  <span className={styles.signup_color_red_marign_top_50}>
                    {errors.contact_number}
                  </span>
                </div>
                <div className={styles.signup_marginleft_20}>
                  <p className={styles.signup_white_color}>User Type</p>
                  <select
                    name="user_type"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className={styles.input}
                  >
                    <option
                      style={{ background: '#000' }}
                      className={styles.option}
                      value="user"
                    >
                      User
                    </option>
                    <option
                      style={{ background: '#000' }}
                      className={styles.option}
                      value="agency"
                    >
                      Representative
                    </option>
                  </select>
                </div>
                <div className={styles.signup_text_center_margintop_20}>
                  <button className={styles.login_btn} onClick={handleSubmit}>
                    Register
                  </button>

                  <p className={styles.signup_white_color}>
                    Sign up as Representive
                  </p>

                  <button className={styles.signup_btn_width_90}>
                    <GoogleAuth />
                  </button>

                  <Link href="login">
                    <p className={styles.signup_color_white_text_decoration}>
                      Already have an account?
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default signup
