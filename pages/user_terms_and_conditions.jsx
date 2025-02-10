import styles from '../styles/TermAndCondition.module.css'
import Image from 'next/image'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Footer from '../src/components/footer/Footer'
import Divider from '@mui/material/Divider'
import Topbar from '../src/components/topbar/Topbar'

const user_terms_and_conditions = () => {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.main}>
          <h1 className={styles.heading}>TERMS & CONDITION</h1>

          <h1 className={styles.subHeading}>1. Acceptance of Terms </h1>

          <p className={styles.txt}>
            By using this Website, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and any other
            applicable laws and regulations. If you do not agree with any part
            of these Terms, you may not use the Website.
          </p>
          <h1 className={styles.subHeading}>2. Changes to Terms</h1>

          <p className={styles.txt}>
            We reserve the right to modify or revise these Terms at any time. We
            will post the most current version on the Website, and the revised
            Terms will become effective immediately upon posting. By continuing
            to use the Website after any changes, you agree to be bound by the
            revised Terms.
          </p>

          <h1 className={styles.subHeading}> 3. User Eligibility</h1>

          <p className={styles.txt}>
            You must be at least [age] years old to use this Website. By using
            the Website, you represent and warrant that you are of legal age to
            form a binding contract with us.
          </p>

          <h1 className={styles.subHeading}> 4. User Account</h1>
          <p className={styles.txt}>
            4.1. You may be required to create a user account to access certain
            features of the Website. You are responsible for maintaining the
            confidentiality of your account and password, and for all activities
            that occur under your account. 4.2. You agree to provide accurate,
            current, and complete information during the registration process
            and to update such information to keep it accurate, current, and
            complete.
          </p>

          <h1 className={styles.subHeading}>5. User Content </h1>

          <p className={styles.txt}>
            5.1. You are solely responsible for any content you contribute to
            the Website, including but not limited to comments, posts, and
            submissions. You agree not to submit any content that is illegal,
            defamatory, offensive, or violates any third-party rights. 5.2. By
            submitting content to the Website, you grant us a worldwide,
            non-exclusive, royalty-free, and transferable license to use,
            reproduce, distribute, and display such content in connection with
            the Website.
          </p>

          <h1 className={styles.subHeading}>6. Privacy</h1>
          <p className={styles.txt}>
            Your use of the Website is also governed by our Privacy Policy,
            which can be found [link to Privacy Policy]. Please review our
            Privacy Policy to understand how we collect, use, and protect your
            personal information.
          </p>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default user_terms_and_conditions
