import Head from 'next/head'
import styles from '../styles/ArtistSignup.module.css'
import React from 'react'
import Image from 'next/image'
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { width } from '@mui/system'
import ThankYouBox from '../src/components/thankyouBox/ThankYouBox'

function payment_completed() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <h1>HOORRAAY!!</h1>

        <p className={styles.payment_completed_paragraph}>
          Your order has been placed
        </p>

        <ThankYouBox isPayment={true} />
        <Footer />
      </div>
    </>
  )
}
export default payment_completed
