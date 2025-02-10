/* eslint-disable react/jsx-key */
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ArtistCard from '../../higherComponents/ArtistCard'
import ArtistCard1 from '../../higherComponents/ArtistCard1'
import Router, { withRouter } from 'next/router'
import styles from '../../../styles/CardSlider.module.css'
import localStorage from 'local-storage'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL
import React, { useEffect, useState, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const CardSlider1 = ({ data }) => {
  const swiperRef = useRef(null)

  function updateVisitedArtists(artist) {
    const visitedArtists = localStorage?.get('visitedArtist') || []

    const existingIndex = visitedArtists?.findIndex(
      (visitedArtist) => visitedArtist?.id === artist?.id,
    )

    if (existingIndex !== -1) {
      // Artist already exists, update their visited flag
      visitedArtists[existingIndex].visited = true
    } else {
      // Artist doesn't exist, add them with the visited flag set to true
      visitedArtists.push({ ...artist, visited: true })
    }

    localStorage?.set('visitedArtist', visitedArtists)
  }

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
            slidesPerView: 7,
          },
          1440: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 5,
          },
          464: {
            slidesPerView: 4,
          },
          0: {
            slidesPerView: 2,
          },
        }}
        // loop={true}
      >
        {data !== undefined ? (
          data?.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                onClick={() => {
                  updateVisitedArtists(item)
                  Router.push({
                    pathname: '/artist_profile',
                    query: { item: item?.id },
                  })
                }}
              >
                <ArtistCard1
                  image={
                    `${baseURL}/${item?.profile_image}`
                  }
                  data={item}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide key={item.id}>
            <ArtistCard
              imgUrl={require('../../Asset/Images/home_profile/artist3.png')}
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default CardSlider1
