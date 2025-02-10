import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import FeatureArtistCard from '../../higherComponents/CategoriesToExploreCard'
import styles from '../../../styles/CardSlider.module.css'
import ArtistCard from '../../higherComponents/ArtistCard'
import Router, { withRouter } from 'next/router'
import CategoriesToExploreCard from '../../higherComponents/CategoriesToExploreCard'
import TrendingTalentsCard from '../../higherComponents/TrendingTalentsCard'
import localStorage from 'local-storage'
import axios from 'axios'
import { Api } from '../../config/Config'
import React, { useEffect, useState, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TrendingTalents = ({ symbol }) => {
  const [trendingTalents, setTrendingTalents] = useState()
  const [trendingTalentsLoader, setTrendingTalentsLoader] = useState(false)
  const swiperRef = useRef(null)

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && trendingTalentsLoader) {
      swiperRef.current.swiper.update()
    }
  }, [trendingTalentsLoader])

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
  useEffect(() => {
    getTrendingTalent()
  }, [])

  const getTrendingTalent = async () => {
    await axios
      .get(
        // Api?.GET_TRENDING_TALENTS
        `${baseURL}/api/trending-talents`,
      )
      .then(function (response) {
        setTrendingTalents(response?.data?.data)
        setTrendingTalentsLoader(true)
      })
      .catch(function (error) {
        toast.error(error.message)
      })
  }

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
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  return (
    <div className={styles.main}>
      <ToastContainer className="tost" />

      {trendingTalentsLoader ? (
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
            {trendingTalents !== undefined ? (
              trendingTalents?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    key={item.id}
                    onClick={() => {
                      updateVisitedArtists(item)
                      Router.push({
                        pathname: '/artist_profile',
                        query: { item: item?.details[0]?.id },
                      })
                    }}
                  >
                    <TrendingTalentsCard
                      imgUrl={`${baseURL}/${item?.details[0]?.user?.profile_image}`}
                      data={item}
                      symbol={symbol}
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <ArtistCard
                  imgUrl={require('../../Asset/Images/home_profile/artist3.png')}
                />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default TrendingTalents
