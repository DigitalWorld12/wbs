/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import styles from "../styles/ArtistSignup.module.css";
import React, { useEffect } from "react";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import ThankYouBoxArtistRegister from "@/components/thankyouBox/ThankYouBoxArtistRegister";
import { useRouter } from "next/router";
function artist_register_thankyou() {
  const router = useRouter()
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/artist_dashboard')
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
export default artist_register_thankyou
