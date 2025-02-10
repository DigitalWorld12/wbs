/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import styles from '../styles/OrderDownload.module.css'
import Topbar from '../src/components/topbar/Topbar'
import Footer from '../src/components/footer/Footer'
import CakeIcon from '@mui/icons-material/Cake'
import Rating from '@mui/material/Rating'
import ReactPlayer from 'react-player'
import video from '../src/Asset/Images/video.png'
import Image from 'next/image'
import ShareIcon from '@mui/icons-material/Share'
import { useRouter } from 'next/router'
import { Api } from '../src/config/Config'
import { reactLocalStorage } from 'reactjs-localstorage'
import axios from 'axios'
import download from 'downloadjs'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GetAppIcon from '@mui/icons-material/GetApp' // Import the download icon

export default function OrderDownload() {
  const router = useRouter()
  const {
    order_id,
    order_video,
    to,
    from,
    occassion,
    message,
    profile,
    artist_id,
  } = router.query
  const [value, setValue] = React.useState(2)
  const [comment, setComment] = useState('')
  const [rateandCmnt, setRateandCmnt] = useState()
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)

  const handleRateAndCmnt = () => {
    // Check if submission has already occurred, and if so, return early
    if (hasSubmitted) {
      console.log('Submission has already occurred.')
      return
    }
    if (!comment || value === 0) {
      toast.warn('Comment and/or rating is empty. Please fill in both fields.')

      return
    }
    axios
      .post(
        // Api?.ADD_REVIEW,
        `${baseURL}/api/order/add-review`,

        {
          order_id: order_id,
          ratting: value,
          comment: comment,
          artist_id: artist_id,
          // is_private: "1",
          is_private: isPrivate ? '1' : '0',
        },
        {
          headers: {
            Authorization:
              'Bearer ' +
              reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
          },
        },
      )
      .then(function (response) {
        if (response?.data?.status === true) {
          toast.success(response?.data?.message)
          setHasSubmitted(true)
          getRateAndCmnt()
          router.push('/track_my_order')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getRateAndCmnt = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE_URL +
          '/api/order/reviews?order_id=' +
          order_id,
        {
          headers: {
            Authorization:
              'Bearer ' +
              reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
          },
        },
      )
      .then((response) => {
        setRateandCmnt(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getRateAndCmnt()
  }, [order_id])

  return (
    <>
      <ToastContainer className="tost" />

      <div className={styles.container}>
        <Topbar />
        <div className={styles.sub_parent}>
          <div style={{ color: '#fff' }} className={styles.sub_container}>
            <div className={styles.sub_child1}>
              <div className={styles.flex}>
                <div className={styles.img_parent}>
                  {/* <Image width={568} src={video} /> */}
                  <Image
                    width={10000}
                    height={10000}
                    src={`${baseURL}/${profile}`}
                    alt=""
                  />
                </div>
              </div>

              <div className={styles.flex}>
                <div className={styles.flex_sub}>
                  <p>From :</p>
                  <span>{to}</span>
                  <p>To :</p>
                  <span>{from}</span>
                </div>
                <div className={styles.flex_sub}>
                  <div className={`${styles.line} ${styles.hide_mobile}`}></div>
                  <CakeIcon className={styles.icon} />
                  <p>{occassion}</p>
                </div>
              </div>

              <div className={styles.flex}>
                <p>Message </p> <div className={styles.hide_mobile}>:</div>
                <p>{message}</p>
              </div>

              {rateandCmnt && rateandCmnt.length > 0 && (
                <>
                  <h1>Comment & Rating</h1>
                  <p style={{ color: 'white', textTransform: 'capitalize' }}>
                    {rateandCmnt[0]?.comment}
                  </p>
                  <Rating name="read-only" value={rateandCmnt[0]?.ratting} />
                </>
              )}
            </div>

            <div className={styles.sub_child2}>
              <div className={styles.flex3}>
                {rateandCmnt && rateandCmnt.length === 0 && (
                  <div className={styles.sub_child2}>
                    <h1>Comment</h1>
                    <textarea
                      className={styles.comment_input}
                      type="text"
                      onChange={(e) => {
                        setComment(e.target.value)
                      }}
                    ></textarea>
                    <h1>Rating</h1>
                    <div className={styles.order_download_background}>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        style={{ background: 'transparent' }}
                        onChange={(event, newValue) => {
                          setValue(newValue)
                        }}
                      />
                    </div>

                    <div className={styles.checkbox_parent}>
                      <input
                        id="c1"
                        name="check_box"
                        type="checkbox"
                        checked={isPrivate}
                        onChange={() => setIsPrivate(!isPrivate)}
                      />
                      <label name="check_box" for="c1">
                        You want to Private this video
                      </label>
                    </div>

                    <button onClick={handleRateAndCmnt}>Submit Reviews</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <video
            className={styles.order_download_video}
            src={`${baseURL}/${order_video}`}
            controls
          ></video>
          <button
            className={styles.download_btn}
            onClick={() => {
              // Construct the URL of the video file based on your project's structure
              const videoUrl = `${baseURL}/${order_video}`

              // Use download.js to trigger the file download
              download(videoUrl, 'video.mp4', 'video/mp4')
            }}
          >
            <GetAppIcon /> Download Video
          </button>
        </div>
        <Footer />
      </div>
    </>
  )
}
