import Head from 'next/head'
//import styles from "../styles/TalentDashboard.module.css";
import styles from '../styles/PaymentMethod.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Payment_Info from '../src/components/Payment Methods/PaymentInformations'
import { useRouter } from 'next/router'

function Payment_Method() {
  const router = useRouter()
  const {
    service_charges,
    orderData,
    platform_commission,
    commission,
  } = router.query
  return (
    <div className={styles.container}>
      <ToastContainer className="tost" />

      <Topbar />

      <div className={styles.Main_Container_Setting}>
        <Payment_Info
          service_charges={service_charges}
          orderData={orderData}
          commissions={commission}
          platform_commission={platform_commission}
        />
      </div>

      <Footer></Footer>
    </div>
  )
}
export default Payment_Method
