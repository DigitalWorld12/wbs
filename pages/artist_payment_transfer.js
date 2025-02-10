import Head from 'next/head'
import styles from '../styles/PaymentMethod.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import Payment_Transfer from '../src/components/Payment Methods/PaymentTransfer'

function Artist_Payment_Transfer() {
  return (
    <div className={styles.container}>
      <Topbar />

      <div className={styles.Main_Container_Setting}>
        <Payment_Transfer />
      </div>
      <Footer></Footer>
    </div>
  )
}
export default Artist_Payment_Transfer
