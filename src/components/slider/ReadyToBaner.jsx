import { useEffect, useState } from 'react'
import styles from '../../../styles/Home.module.css'
import Link from 'next/link'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ReadyToBaner() {
  const [Banner, setBanner] = useState()
  const [BannerLoader, setBannerLoader] = useState(false)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const GetReadyToBanner = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/professional_banner',
      )

      if (response?.data?.status === true) {
        setBanner(response?.data?.data[0])
        setBannerLoader(true)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    GetReadyToBanner()
  }, [])
  return (
    <>
      <ToastContainer className="tost" />

      {BannerLoader ? (
        <div
          className={styles.ready_to_section}
          style={{
            background: `url(${baseUrl}/${Banner?.image})`,
          }}
        >
          <h1>{Banner?.title}</h1>
          <Link href={Banner?.link} className={styles.show_more}>
            {/* Discover */}
            {Banner?.button_text}
          </Link>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
