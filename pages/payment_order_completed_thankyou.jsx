/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import styles from '../styles/ArtistSignup.module.css'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { width } from '@mui/system'
import ThankYouBox from '../src/components/thankyouBox/ThankYouBox'
import ThankYouBoxArtistRegister from '@/components/thankyouBox/ThankYouBoxArtistRegister'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import { reactLocalStorage } from 'reactjs-localstorage'
function payment_order_completed_thankyou() {
  const router = useRouter()
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/track_my_order')
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

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

        <ThankYouBoxArtistRegister />
      </div>
      <Footer />
    </>
  )
}
export default payment_order_completed_thankyou
