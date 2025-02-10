import Head from 'next/head'
import styles from '../styles/BusinessDone.module.css'
import React from 'react'
import Image from 'next/image'
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import BusinessThankYouBox from '../src/components/thankyouBox/BusinessThankYouBox'

function business_done() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Business_Done_width_90}></div>

        <div className={styles.Business_Done_height_100}></div>

        <h1 className={styles.Business_Done_heading_h1}>HOORRAAY!!</h1>

        <p className={styles.Business_Done_paragraph}>
          Your business order has been placed{' '}
        </p>

        <BusinessThankYouBox></BusinessThankYouBox>
      </div>
      <Footer />
    </>
  )
}
export default business_done
