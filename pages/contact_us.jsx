/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../styles/ContactUs.module.css'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import React, { useEffect, useState } from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import { toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'

function ContactUs() {
  const Subjects = ['Business', 'General', 'Errors', 'Report']

  const [contactUs, setContactUs] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: '',
  })
  const inputHandler = (e) => {
    const { name, value } = e.target
    setContactUs({ ...contactUs, [name]: value })
  }

  const handleSubject = (e) => {
    setContactUs({ ...contactUs, subject: e.target.value })
  }

  const handleSubmit = (e) => {
    axios
      .post(
        // Api?.CONTACTUS
        process.env.NEXT_PUBLIC_CONTACTUS,

        contactUs,
      )
      .then((response) => {
        if (response.data.status === true) {
          toast.success(response?.data?.message, { autoClose: 5000 })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <Topbar />
      <div className={styles.contact_us_main}>
        <div className={styles.e_learning_baner_sec1}>
          <h1>Contact Us</h1>
        </div>

        <div className={styles.contact_us_container}>
          <div className={styles.contact_us_sub_container_left}>
            <div className={styles.left_sub1}>
              <h1>Contact Information</h1>
              <p>Say something to start a live chat!</p>
            </div>
            <div className={styles.left_sub2}>
              <Link href="#" className={styles.left_sub2_child}>
                <PhoneInTalkIcon className={styles.contact_icon} />
                <p>+1012 3456 789</p>
              </Link>
              <Link href="#" className={styles.left_sub2_child}>
                <EmailIcon className={styles.contact_icon} />
                <p>demo@gmail.com</p>
              </Link>
              <Link href="#" className={styles.left_sub2_child}>
                <LocationOnIcon className={styles.contact_icon} />
                <p>
                  132 Dartmouth Street Boston, Massachusetts 02156 United States
                </p>
              </Link>
            </div>
            <div className={styles.left_sub3}>
              <Link href="#" className={styles.left_sub3_child}>
                <FacebookIcon className={styles.social_icon} />
              </Link>
              <Link href="#" className={styles.left_sub3_child}>
                <TwitterIcon className={styles.social_icon} />
              </Link>
              <Link href="#" className={styles.left_sub3_child}>
                <InstagramIcon className={styles.social_icon} />
              </Link>
            </div>
          </div>

          <div className={styles.contact_us_sub_container_right}>
            <div className={styles.right_sub1}>
              <input type="text" placeholder="First Name" name="name" c />
              <input type="text" placeholder="Last Name" />
            </div>

            <div className={styles.right_sub2}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => inputHandler(e)}
              />
              <input
                type="number"
                placeholder="Phone #"
                name="phone"
                onChange={(e) => inputHandler(e)}
              />
            </div>

            <p className={styles.subject_pra}>Select Subject?</p>
            <select
              className={styles.select}
              name="subject"
              id=""
              onChange={(e) => handleSubject(e)}
              placeholder="Select Subject"
            >
              {Subjects.map((item) => (
                <>
                  <option className={styles.option} value={item}>
                    {item}
                  </option>
                </>
              ))}
            </select>

            <div className={styles.right_sub4}>
              <textarea
                type="text"
                placeholder="Write your message.."
                name="message"
                onChange={(e) => inputHandler(e)}
              />
            </div>
            <div className={styles.right_sub5}>
              <button onClick={handleSubmit}>Send Message</button>
            </div>
          </div>
        </div>
        <ToastContainer className="tost" />
      </div>
      <Footer />
    </div>
  )
}
export default ContactUs
