/* eslint-disable react/no-unescaped-entities */
import styles from '../styles/TermAndCondition.module.css'
import Image from 'next/image'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Footer from '../src/components/footer/Footer'
import Divider from '@mui/material/Divider'
import Topbar from '../src/components/topbar/Topbar'

const user_privacy_policy = () => {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.main}>
          <h1 className={styles.heading}>PRIVACY & POLICIES</h1>

          <p className={styles.txt}>
            Please take a moment to read this Privacy Policy carefully. By
            accessing or using the Website, you acknowledge that you have read,
            understood, and agree to be bound by the terms and conditions of
            this Privacy Policy.
          </p>

          <h1 className={styles.subHeading}>1. Information We Collect</h1>

          <p className={styles.txt}>
            a. Personal Information: We may collect personal information from
            you when you voluntarily provide it to us. This may include your
            name, email address, phone number, and any other information you
            provide when filling out forms on our Website.
          </p>

          <p className={styles.txt}>
            b. Automatically Collected Information: We may collect certain
            information automatically when you visit our Website. This may
            include your IP address, browser type, device information, and usage
            data. We use cookies and similar tracking technologies to collect
            this information. You can control the use of cookies through your
            browser settings.
          </p>

          <h1 className={styles.subHeading}>2. How We Use Your Information</h1>

          <p className={styles.txt}>
            We may use your personal information for the following purposes:
          </p>

          <p className={styles.txt}>
            a. To provide and improve our services to you. b. To respond to your
            inquiries and provide customer support. c. To send you promotional
            and marketing materials, with your consent. d. To comply with legal
            obligations and enforce our terms and policies. e. To analyze and
            improve the functionality of our Website.
          </p>

          <h1 className={styles.subHeading}>3. Information Sharing</h1>

          <p className={styles.txt}>
            a. With your consent. b. With service providers who help us operate
            and improve our Website. c. To comply with legal obligations or
            protect our rights and interests. d. In the event of a merger,
            acquisition, or sale of all or a portion of our assets.
          </p>

          <h1 className={styles.subHeading}>4. Data Security</h1>

          <p className={styles.txt}>
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, or destruction.
            However, no method of transmission over the internet or electronic
            storage is entirely secure, and we cannot guarantee absolute
            security.
          </p>

          <h1 className={styles.subHeading}> 5. Your Choices</h1>
          <p className={styles.txt}>
            You have the following rights regarding your personal information:{' '}
            a. You can review and update your personal information by contacting
            us. b. You can opt out of receiving promotional emails by following
            the unsubscribe instructions in the emails. c. You can disable
            cookies through your browser settings.
          </p>
          <br></br>
          <h1 className={styles.subHeading}>6. Children's Privacy</h1>
          <p className={styles.txt}>
            Our Website is not intended for children under the age of 13. We do
            not knowingly collect or solicit personal information from children.
            If you believe that we may have collected personal information from
            a child, please contact us.
          </p>
          <br></br>
          <h1 className={styles.subHeading}> 7. Changes to this Privacy</h1>
          <p className={styles.txt}>
            Policy We may update this Privacy Policy from time to time. The date
            of the latest revision will be indicated at the top of this page. We
            encourage you to review this Privacy Policy periodically.
          </p>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default user_privacy_policy
