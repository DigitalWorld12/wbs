import Head from 'next/head'
import styles from '../styles/PaymentMethod.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'

import Payment_Card_View from '../src/components/Payment Methods/PaymentCardView'

function Artist_Payment_Card_View() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          <Payment_Card_View />
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}
export default Artist_Payment_Card_View
