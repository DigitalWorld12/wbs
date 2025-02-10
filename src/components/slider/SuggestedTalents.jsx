import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import React, { useEffect, useState, useRef } from 'react'

import FeatureArtistCard from '../../higherComponents/CategoriesToExploreCard'
import styles from '../../../styles/CardSlider.module.css'
import ArtistCard from '../../higherComponents/ArtistCard'
import Router, { withRouter } from 'next/router'
import CategoriesToExploreCard from '../../higherComponents/CategoriesToExploreCard'
import TrendingTalentsCard from '../../higherComponents/TrendingTalentsCard'
import ViewedTalentsCard from '../../higherComponents/ViewedTalentsCard'
import localStorage from 'local-storage'
import SuggestedTalentsCard from '../../higherComponents/SuggestedTalentsCard'
import axios from 'axios'
import { Api } from '../../config/Config'
import Link from 'next/link'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SuggestedTalents = ({ data, symbol }) => {
  const [suggestedTalents, setSuggestedTalents] = useState()
  const [suggestedTalentsLoader, setSuggestedTalentsLoader] = useState(false)

  const swiperRef = useRef(null)

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && suggestedTalentsLoader) {
      swiperRef.current.swiper.update()
    }
  }, [suggestedTalentsLoader])

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
    getSuggestedTalent()
  }, [])

  const getSuggestedTalent = async () => {
    await axios
      .get(
        // Api?.GET_SUGGESTED_TALENTS
        `${baseURL}/api/suggested-talent`,

        {
          headers: {
            Authorization: `Bearer ${
              localStorage.get('loginAuth')?.authorisation?.token
            }`,
          },
        },
      )
      .then(function (response) {
        setSuggestedTalents(response?.data?.data)

        setSuggestedTalentsLoader(true)
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

  return (
    <div className={styles.main}>
      <ToastContainer className="tost" />

      {suggestedTalentsLoader ? (
        <>
          {suggestedTalents?.length === 0 && (
            <>
              <h1>
                No Content Availible as of now.Please add order to get
                suggestions
              </h1>
            </>
          )}
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
              {suggestedTalents !== undefined
                ? suggestedTalents?.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div
                        key={item.id}
                        onClick={() => {
                          updateVisitedArtists(item)
                          Router.push({
                            pathname: '/artist_profile',
                            query: { item: item?.id },
                          })
                        }}
                      >
                        <SuggestedTalentsCard
                          imgUrl={`${baseURL}/${item?.profile_image}`}
                          data={item}
                          symbol={symbol}
                        />
                      </div>
                    </SwiperSlide>
                  ))
                : ''}
            </Swiper>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default SuggestedTalents
