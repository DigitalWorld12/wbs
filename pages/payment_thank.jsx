import Head from 'next/head'
import styles from '../styles/ArtistSignup.module.css'
import React from 'react'
import Image from 'next/image'
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons'
import Footer from '../src/components/footer/Footer'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { width } from '@mui/system'
import ThankYouBox from '../src/components/thankyouBox/ThankYouBox'
import PaymentSuccessfulBox from '../src/components/thankyouBox/PaymentSuccessfulBox'
import TopBar from '../src/components/topbar/Topbar'

function artist_signup_thankyou() {
  return (
    <>
      <div className={styles.container}>
        <TopBar />
        <div className={styles.payment_thanks_div_width}></div>

        <h1 className={styles.payment_thanks_div_h1}>HOORRAAY!!</h1>

        <p className={styles.payment_thanks_div_para}>
          Your payment have been completed successfully and your ordered have
          been received
        </p>

        <PaymentSuccessfulBox />
      </div>
      <Footer />
    </>
  )
}
export default artist_signup_thankyou
