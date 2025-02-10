import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import React, { useEffect, useState, useRef } from 'react'

import styles from '../../../styles/CardSlider.module.css'
import ArtistCard from '../../higherComponents/ArtistCard'
import Router, { withRouter } from 'next/router'
import FeatureVideoCard from '../../higherComponents/FeatureVideoCard'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ArtistOrderVideo = ({ artistVideo }) => {
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
    <div className={styles.main}>
      <div className={styles.swiper_parent}>
        <div className={styles.btn_parent}>
          <div className="swiper-button-prev" onClick={slidePrev}></div>
          <div className="swiper-button-next" onClick={slideNext}></div>
        </div>

        <Swiper
          ref={swiperRef} // Assign the swiperRef to the Swiper component
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          breakpoints={{
            1920: {
              slidesPerView: 11.25,
            },
            1440: {
              slidesPerView: 8.25,
            },
            1024: {
              slidesPerView: 6.25,
            },
            464: {
              slidesPerView: 5.25,
            },
            375: {
              slidesPerView: 2.25,
            },
            0: {
              slidesPerView: 2,
            },
          }}
          // loop={true}
        >
          {artistVideo && artistVideo.length > 0 ? (
            artistVideo?.map((item, i) => (
              <SwiperSlide key={item.id}>
                <div key={item.id}>
                  <FeatureVideoCard
                    imgUrl={`${baseURL}/${item.video}`}
                    data={item}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <FeatureVideoCard
                imgUrl={`${baseURL}/upload/videos/2023/1680248631_e8lSnGCvI90IWFT_saad.mp4`}
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  )
}

export default ArtistOrderVideo
