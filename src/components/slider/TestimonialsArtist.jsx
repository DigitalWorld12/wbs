import styles from '../../../styles/Testimonials.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Rating from '@mui/material/Rating'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function TestimonialsArtist({ data }) {
  const Messages = data?.rate_and_comments
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

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
      <ToastContainer className="tost" />
      {Messages && Messages.length > 0 ? (
        <div className={styles.testimonials_section}>
          <div className={styles.testimonials_section_content}>
            <h1>testimonials</h1>
            <p>Kind Words From Our Incredible Customers</p>
          </div>

          <div className={styles.testimonials_section_sub}>
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
                // loop={true}
              >
                {Messages &&
                  Messages.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.item} key={index}>
                        <div className={styles.item_icon}>
                          <Image
                            src={require('../../../src/Asset/Images/icon.png')}
                            alt="Picture of the icon"
                          />
                        </div>
                        <p className={styles.message_paragraph}>
                          {item?.comment.charAt(0).toUpperCase() +
                            item?.comment.slice(1)}
                        </p>

                        <div className={styles.item_devider}> </div>

                        <div
                          container
                          className={styles.item_profile_container}
                        >
                          <div>
                            <Image
                              alt="complex"
                              sx={{ width: 100, height: 100 }}
                              src={`${baseURL}/${item?.user?.profile_image}`}
                              height={100}
                              width={100}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                              }}
                            />
                          </div>

                          <div className={styles.item_rating}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={2.5}
                              precision={item?.ratting}
                              readOnly
                            />

                            <p>
                              {item?.user?.name.charAt(0).toUpperCase() +
                                item?.user?.name.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
