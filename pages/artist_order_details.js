import Head from 'next/head'
import styles from '../styles/TalentDashboard.module.css'
import React, { useEffect } from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import ArtistOrderDashboard from '../src/components/Artist Dashboard/artist_order_dashboard'
import { useRouter } from 'next/router'
import { reactLocalStorage } from 'reactjs-localstorage'

function ArtistOrderDetails() {
  const router = useRouter()
  useEffect(() => {
    const data = reactLocalStorage.getObject('loginAuth')

    if (Object.keys(data).length === 0) {
      router.push('/login')
    }
  }, [])
  return (
    <div className={styles.container}>
      <Topbar />

      <div className={styles.Main_Container_Setting}>
        <ArtistOrderDashboard />
        <div className={styles.artist_dashboard_margin10}></div>
      </div>

      <Footer></Footer>
    </div>
  )
}
export default ArtistOrderDetails
