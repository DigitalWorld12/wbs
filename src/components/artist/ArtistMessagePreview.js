import styles from '../../../styles/ArtistMessage.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Rating from '@mui/material/Rating'
import React, { useEffect, useState, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import axios from 'axios'

function ArtistMessagePreview({ setOrderData, orderData }) {
  const [messageData, setMessageData] = useState([])
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    const occasionId = orderData?.occasion_id
    axios
      .get(`${baseURL}/api/occasion-messages?occasion_id=${occasionId}`)
      .then((response) => {
        // Handle the successful response here
        const responseData = response?.data?.data
        // Limit the messages to 15 or less
        const limitedMessages = responseData.slice(0, 15)

        setMessageData(limitedMessages)
        // setMessageData(responseData);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error fetching data:', error)
      })
  }, [orderData?.occasion_id])
  const swiperRef = useRef(null)

  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  return (
    <>
      {messageData && (
        <div className={styles.artist_message_section}>
          <div className={styles.artist_message_section_content}>
            <h1>Message</h1>
            <p>Kind Words From Our Incredible Customers</p>
          </div>

          <div className={styles.artist_message_section_sub}>
            <div className={styles.swiper_parent}>
              <div className={styles.btn_parent}>
                <div className="swiper-button-prev" onClick={slidePrev}></div>
                <div className="swiper-button-next" onClick={slideNext}></div>
              </div>

              <Swiper
                ref={swiperRef} // Assign the swiperRef to the Swiper component
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={5}
                spaceBetween={24}
                breakpoints={{
                  1920: {
                    slidesPerView: 5,
                  },
                  1440: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  464: {
                    slidesPerView: 2,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
              >
                {messageData.map((message, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles.item}>
                      <div className={styles.item_icon}>
                        <Image
                          src={require('../../../src/Asset/Images/icon.png')}
                          alt="Picture of the icon"
                        />
                      </div>

                      <p className={styles.message_paragraph}>
                        {message.message}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default ArtistMessagePreview
