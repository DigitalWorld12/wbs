import styles from '../styles/TermAndCondition.module.css'
import Image from 'next/image'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Footer from '../src/components/footer/Footer'
import Divider from '@mui/material/Divider'
import Topbar from '../src/components/topbar/Topbar'
import Returns_Refunds from '@/components/artist/Returns_Refunds'

const returns_refunds = () => {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <Divider style={{ width: '90%' }} color={'white'} variant="middle" />

        <div className={styles.main}>
          <h1 className={styles.heading}>Returns And Refunds</h1>
          <br />
          <h1 className={styles.subHeading}>Return Policy Overview</h1>

          <p className={styles.txt}>
            Provide a concise summary of your return policy. Explain the key
            points, such as the timeframe for returns, condition of items, and
            eligibility criteria.
          </p>
          <h1 className={styles.subHeading}>Return Process:</h1>

          <p className={styles.txt}>
            Describe the step-by-step process customers should follow to
            initiate a return. Include instructions on how to contact your
            support team or use any return request forms if applicable.
          </p>
          <h1 className={styles.subHeading}>Eligibility Criteria:</h1>

          <p className={styles.txt}>
            Clearly state the conditions under which a customer is return
            request will be accepted. This might include factors like unused
            items, original packaging, and time limits.
          </p>
          <h1 className={styles.subHeading}>Refund Policy:</h1>

          <p className={styles.txt}>
            Detail your refund policy, including the method and timeline for
            processing refunds. Be transparent about any fees or deductions that
            might apply.
          </p>
        </div>
        <Returns_Refunds />
      </div>
      <Footer></Footer>
    </>
  )
}

export default returns_refunds
