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

export default function Testimonials() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const [testimonials, setTestimonials] = useState([])
  const [testimonialsLoader, setTestimonialsLoader] = useState(false)
  const GetTestimonials = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/testimonials',
      )

      if (response?.data?.status === true) {
        setTestimonials(response?.data?.data)
        setTestimonialsLoader(true)
      }
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    GetTestimonials()
  }, [])

  const swiperRef = useRef(null)

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && testimonialsLoader) {
      swiperRef.current.swiper.update()
    }
  }, [testimonialsLoader])

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

      {testimonialsLoader ? (
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
                // slidesPerView={5}
                spaceBetween={10}
                breakpoints={{
                  1920: {
                    slidesPerView: 5.25,
                  },
                  1440: {
                    slidesPerView: 4.25,
                  },
                  1024: {
                    slidesPerView: 3.25,
                  },
                  464: {
                    slidesPerView: 2.25,
                  },
                  0: {
                    slidesPerView: 1.25,
                  },
                }}
                // loop={true}
              >
                {testimonials &&
                  testimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.item} key={index}>
                        <h2>
                          {item?.user?.name.charAt(0).toUpperCase() +
                            item?.user?.name.slice(1)}
                        </h2>
                        <div className={styles.item_rating}>
                          <Rating
                            name="half-rating-read"
                            defaultValue={2.5}
                            precision={item?.rating}
                            readOnly
                          />
                        </div>
                        <p className={styles.message_paragraph}>
                          <i>
                            {item?.comment.charAt(0).toUpperCase() +
                              item?.comment.slice(1)}
                          </i>
                        </p>
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
