import Head from 'next/head'
import styles from '../styles/PaymentMethod.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import PaymentCardWithDraw from '@/components/Payment Methods/PaymentCardWithDraw'

function Artist_Payment_Withdraw() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          <PaymentCardWithDraw />
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}
export default Artist_Payment_Withdraw
