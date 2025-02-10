/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../styles/Login.module.css'
import React, { useEffect, useState } from 'react'
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
import OtpInput from 'react-otp-input'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function ForgatePassword() {
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const otpHandleChange = (otp) => setOtp(otp)
  const handleOtpComplete = (otpValue) => {
    // This function will be called when the user has completed entering all OTP digits
    // console.log("OTP Entered:", otpValue);
    // Add your logic here to handle the completed OTP (e.g., trigger OTP verification)
  }
  const [passwordVisible, setPasswordVisible] = React.useState(false)

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const [otp, setOtp] = useState('')
  const [isOtp, setIsOtp] = useState(false)
  const [isPassword, setPassword] = useState(false)
  const [isChangePassword, setChangePassword] = useState(false)
  const [isOtpVerified, setOtpVerified] = useState(false)
  const [userId, setUserId] = useState('')
  const [countdown, setCountdown] = useState(120)
  const [showResendButton, setShowResendButton] = useState(false)
  const router = useRouter()

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
  const handleResetPassword = async () => {
    if (!email) {
      setMessage('Email is required.')
      setShowMessage(true)
      return
    }

    try {
      const response = await axios.post(`${baseURL}/api/auth/forget-password`, {
        email,
      })
      if (response?.data?.status === true) {
        setIsOtp(true)

        setUserId(response?.data?.user?.id)
        setEmail(response?.data?.user?.email)

        toast.success(response?.data?.message)
      }
      if (response?.data?.status === false) {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setMessage('Failed to send reset request. Please try again later. ')
    }
  }
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
          setChangePassword(true)
          setOtp('')
          setOtpVerified(true)
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
      .post(
        // Api?.RESENT_VERIFICATION,
        `${baseURL}/api/auth/resend-opt`,
        {
          user_id: userId,
        },
      )
      .then(function (response) {
        if (response?.data?.status === true) {
          toast.success(response?.data?.message)

          setIsOtp(true)
          setPassword(false) // Make sure this sets isOtp to true
          startCountdown() // Restart the countdown
          setShowResendButton(false)
        }
      })
      .catch(function (error) {
        toast.error(error?.message)
      })
  }

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  // console.log(email, "tes");
  const formik = useFormik({
    initialValues: {
      email: email,
      password: '',
      password_confirmation: '',
    },
    onSubmit: async (values) => {
      try {
        await axios
          .post(
            `${baseURL}/api/auth/forget-password/reset-password`,
            {
              email: email,
              password: values.password,
              password_confirmation: values.password_confirmation,
            },
            {
              headers: {
                Authorization:
                  'Bearer ' +
                  localStorage.get('loginAuth')?.authorisation?.token,
              },
            },
          )
          .then((response) => {
            if (response?.data?.status === true) {
              toast.success(response?.data?.message)
              router.push('/login')
            }
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
          'Password confirmation must match the password.'
      }

      return errors
    },
  })
  return (
    <>
      <div className={styles.container}>
        <ToastContainer className="tost" />

        <div className={styles.line}></div>

        <div className={styles.center_main_div}>
          <div className={styles.sub_main_div_left}>
            <h1 className={styles.signup_white_color}>Reset Your Password</h1>
            <h3 className={styles.signup_white_color}>
              This option is straightforward and action-oriented, prompting the
              user to take the necessary step.
            </h3>
          </div>

          <div className={styles.sub_main_div_right}>
            <div className={styles.right_div_box}>
              <div style={{ display: !isOtp ? '' : 'none' }}>
                <div className={styles.signup_marginleft_20}>
                  <p className={styles.signup_white_color}>Your Email</p>

                  <input
                    type="text"
                    name="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className={styles.login_color_red}>
                    {showMessage && message}
                  </span>
                </div>

                <div className={styles.btn_div}>
                  <button
                    className={styles.login_btn}
                    onClick={handleResetPassword}
                  >
                    Submit
                  </button>
                </div>
              </div>
              {!isOtpVerified ? (
                <div
                  className={styles.signup_width_100_height_80}
                  style={{
                    display: isOtp ? 'flex' : 'none',
                  }}
                >
                  <p className={styles.signup_white_color_align_center}>
                    We have sent you One Time Password to your mail.
                    <br />
                    Please Enter OTP
                  </p>
                  <h3 style={{ color: '#fff' }}>{email ? email : ''}</h3>

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
                    autoFocus
                    onComplete={handleOtpComplete}
                    renderInput={(props, index) => (
                      <input
                        {...props}
                        type="number"
                        className={`${styles.signup_otp_input_alignment} ${styles.noSpinButtons}`}
                        maxLength="1"
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
                          ...props.style,
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
                    <button
                      className={styles.otp_btn}
                      onClick={otpVerification}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ) : null}

              {isChangePassword ? (
                <form
                  onSubmit={formik.handleSubmit}
                  style={{ display: isChangePassword ? '' : 'none' }}
                >
                  <div>
                    <p className={styles.signup_white_color}>New Password</p>
                    <div className={styles.password_parent}>
                      <input
                        id="password"
                        name="password"
                        className={styles.input1}
                        type={passwordVisible ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
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
                    {formik.touched.password && formik.errors.password ? (
                      <div style={{ color: '#fff' }}>
                        {formik.errors.password}
                      </div>
                    ) : null}

                    <p className={styles.signup_white_color}>
                      Confirm Password
                    </p>
                    <div className={styles.password_parent}>
                      <input
                        id="password_confirmation"
                        name="password_confirmation"
                        className={styles.input1}
                        type={passwordVisible ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password_confirmation}
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

                    {formik.touched.password_confirmation &&
                    formik.errors.password_confirmation ? (
                      <div style={{ color: '#fff' }}>
                        {formik.errors.password_confirmation}
                      </div>
                    ) : null}

                    <div className={styles.btn_div}>
                      <button className={styles.login_btn} type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
            {/* ---------------------------------------------------------- */}
          </div>
        </div>
      </div>
    </>
  )
}
export default ForgatePassword
