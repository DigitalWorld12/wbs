import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import React, { useEffect, useState } from 'react'
import FeatureArtistCard from '../../higherComponents/CategoriesToExploreCard'
import styles from '../../../styles/CardSlider.module.css'
import ArtistCard from '../../higherComponents/ArtistCard'
import Router, { withRouter } from 'next/router'
import CategoriesToExploreCard from '../../higherComponents/CategoriesToExploreCard'
import TrendingTalentsCard from '../../higherComponents/TrendingTalentsCard'
import NewTalentsCard from '../../higherComponents/NewTalentsCard'
import localStorage from 'local-storage'
import axios from 'axios'
import { Api } from '../../config/Config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    // partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
}
const NewTalents = () => {
  const [newTalents, setNewTalents] = useState()
  useEffect(() => {
    getNewTalent()
  }, [])

  const getNewTalent = async () => {
    await axios
      .get(
        // Api?.GET_NEW_TALENTS
        `${baseURL}/api/new-talent`,
      )
      .then(function (response) {
        setNewTalents(response?.data?.data)
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

      <Carousel
        removeArrowOnDeviceType={['tablet', 'mobile']}
        keyBoardControl={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3400}
        responsive={responsive}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-20-px"
        className={styles.carousel}
      >
        {newTalents !== undefined ? (
          newTalents?.map((item) => (
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
              <NewTalentsCard
                imgUrl={`${baseURL}/${item?.profile_image}`}
                data={item}
              />
            </div>
          ))
        ) : (
          <div>
            <ArtistCard
              imgUrl={require('../../Asset/Images/home_profile/artist3.png')}
            />
          </div>
        )}
      </Carousel>
    </div>
  )
}

export default NewTalents
