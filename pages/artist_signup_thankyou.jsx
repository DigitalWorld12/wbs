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

function artist_signup_thankyou() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.artist_signup_thankyou_width_90}></div>

        <div className={styles.artist_signup_thankyou_height_100}></div>

        <h1 className={styles.artist_signup_thankyou_heading_h1}>HOORRAAY!!</h1>

        <p className={styles.artist_signup_thankyou_paragraph}>
          Your request has been placed
        </p>

        <ThankYouBox />
      </div>
      <Footer />
    </>
  )
}
export default artist_signup_thankyou
