import Head from 'next/head'
import styles from '../styles/PaymentMethod.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'

import Payment_Card from '../src/components/Payment Methods/PaymentCard'

function Artist_Payment_Card() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          <Payment_Card />
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}
export default Artist_Payment_Card
