/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import styles from '../styles/TalentDashboard.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import { useRouter } from 'next/router'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useEffect } from 'react'

import ArtistDashboard from '../src/components/Artist Dashboard/artist_dashboard'
import TrackOrder from '../src/components/Track Order/TrackOrder'

function artist_track_my_order() {
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
        <TrackOrder />
      </div>

      <Footer></Footer>
    </div>
  )
}
export default artist_track_my_order
