/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import styles from '../styles/ArtistProfile.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import Artist_Profile from '../src/components/artist/artist_profile'
import axios from 'axios'
import Slider2 from '../src/components/slider/Slider2'
import HowItWorks from '../src/components/slider/HowItWorks'
import Testimonials from '../src/components/slider/Testimonials'
import CardSlider from '../src/components/slider/CardSlider'
import KnowMoreAboutActor from '../src/components/artist/KnowMoreAboutActor'
import ArtistOrderVideo from '@/components/slider/ArtistOrderVideo'
import TestimonialsArtist from '@/components/slider/TestimonialsArtist'

function artist_profile() {
  var router = useRouter()
  const { item } = router.query
  const [data, setData] = useState()
  const [artistVideo, setArtistVideo] = useState()

  const [dataLoader, setDataLoader] = useState(false)

  const getArtistById = async () => {
    if (!item) {
      return
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist-details/${item}`,
      )

      setData(response?.data?.data)
      setArtistVideo(response?.data?.order_videos)

      setDataLoader(true)
    } catch (error) {
      console.error('Error fetching artist data:', error)
    }
  }

  useEffect(() => {
    getArtistById()
  }, [item])

  return (
    <div className={styles.container}>
      <div>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          {dataLoader ? <Artist_Profile data={data} /> : ''}

          {artistVideo && artistVideo.length > 0 ? (
            <div className={styles.suggested_talent_section}>
              <h1>Videos from {data ? data.nick_name : '( Actor )'}</h1>
              <ArtistOrderVideo artistVideo={artistVideo} />
            </div>
          ) : (
            <></>
          )}

          {dataLoader ? <KnowMoreAboutActor data={data} /> : ''}
          <TestimonialsArtist data={data} />
        </div>
      </div>

      <Footer></Footer>
    </div>
  )
}
export default artist_profile
