/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import styles from '../styles/Dashboard.module.css'
import React, { useState } from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'

import axios from 'axios'
import { useEffect } from 'react'
import localStorage from 'local-storage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TrackOrderUserDashboard from '@/components/Track Order/TrackOrderUserDashboard'
import { useRouter } from 'next/router'
import { reactLocalStorage } from 'reactjs-localstorage'

function dashboard() {
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

        <ToastContainer className="tost" />

        <h1 className={styles.main_heading}>Dashboard</h1>

        <TrackOrderUserDashboard />

        <Footer></Footer>
      </div>
    </>
  )
}
export default dashboard
