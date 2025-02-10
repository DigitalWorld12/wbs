/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import styles from '../styles/TalentDashboard.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import ArtistDashboard from '../src/components/Artist Dashboard/artist_dashboard'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function artist_dashboard() {
  const router = useRouter()
  useEffect(() => {
    const data = reactLocalStorage.getObject('loginAuth')
    if (Object.keys(data).length === 0) {
      router.push('/login')
    }
  }, [])
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          <ArtistDashboard />
          <div className={styles.artist_dashboard_margin10}></div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  )
}
export default artist_dashboard
