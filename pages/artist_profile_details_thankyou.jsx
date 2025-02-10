import Head from 'next/head'
import styles from '../styles/ArtistProfileDetails.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import ThankYouBox from '../src/components/thankyouBox/ThankYouBox'

function artist_profile_details_thankyou() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.artist_profile_details_thankyou_width_100}></div>

        <div className={styles.artist_profile_details_thankyou_height}></div>

        <h1 className={styles.artist_profile_details_thankyou_heading_h1}>
          {" YOU'RE READY TO ROLL"}
        </h1>

        <p className={styles.artist_profile_details_thankyou_paragraph}>
          Your request has been placed
        </p>

        <ThankYouBox />
      </div>
      <Footer />
    </>
  )
}
export default artist_profile_details_thankyou
