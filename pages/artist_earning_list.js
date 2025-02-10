import Head from 'next/head'
import styles from '../styles/TalentDashboard.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'

import Talent_Earning from '../src/components/Talent Earning/talent_earning'
import Talent_Total_Order from '../src/components/Talent Earning/talent_total_order'

function Talent_Earning_Dashboard() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          <Talent_Total_Order />
          <div className={styles.artist_dashboard_margin10}></div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  )
}
export default Talent_Earning_Dashboard
