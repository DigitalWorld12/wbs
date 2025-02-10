/* eslint-disable react-hooks/rules-of-hooks */
import Footer from '@/components/footer/Footer'
import Topbar from '@/components/topbar/Topbar'
import React, { useState } from 'react'
import styles from '../styles/Representive.module.css'
import card_img from '../src/Asset/Images/actor_dp.png'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { reactLocalStorage } from 'reactjs-localstorage'
import { useEffect } from 'react'
import axios from 'axios'

export default function representive_dashboard() {
  const getArtistDataMultiple = async () => {
    try {
      const data = reactLocalStorage.getObject('loginAuth')
      const token = data?.authorisation?.token
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/artist/artists-profiles',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      reactLocalStorage.setObject('isArtistMultple', response?.data)
      setAllArtists(response?.data?.data || [])
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized')
        reactLocalStorage?.remove('loginAuth')
        router.push('/login')
      } else {
        console.error('Error: ', error)
      }
    }
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter() // Add this line

  const [allArtists, setAllArtists] = useState([])
  const [data, setSelectedArtist] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = reactLocalStorage.getObject('isArtistMultple')
      const artistsData = data?.data
      setAllArtists(artistsData || [])
    }
  }, [])
  const handleSwitch = (selectedArtistId) => {
    const data = allArtists.find((artist) => artist.id === selectedArtistId)

    const loginAuthData = reactLocalStorage.getObject('loginAuth')
    const updatedLoginAuthData = { ...loginAuthData, data }
    reactLocalStorage.setObject('isArtist', updatedLoginAuthData)

    setSelectedArtist(data)
    router.push('/artist_dashboard')
  }

  useEffect(() => {
    const fetchData = async () => {
      await getArtistDataMultiple()
    }
    if (typeof window !== 'undefined') {
      const data = reactLocalStorage.getObject('isArtistMultple')
      const artistsData = data?.data
      setAllArtists(artistsData || [])
    }
    fetchData()
  }, [])
  const ArtistData =
    typeof window !== 'undefined'
      ? reactLocalStorage.getObject('isArtist')
      : null

  const ArtistId = ArtistData?.data?.id

  const handleSignOut = () => {
    reactLocalStorage?.remove('isArtist')
    router.push('/representive_dashboard')
  }

  return (
    <div>
      <div className={styles.container}>
        <Topbar />
        <div className={styles.latest_content_section}>
          {allArtists &&
            allArtists.map((artist) => (
              <div key={artist.id} className={styles.card}>
                <div className={styles.user_image}>
                  <Image
                    src={`${baseUrl}/${artist?.profile_image}`}
                    // src={card_img}
                    alt="image"
                    width={10000}
                    height={10000}
                  />
                </div>

                <div className={styles.content}>
                  <h3 className={styles.name}>{artist?.nick_name}</h3>
                  <p className={styles.username}>{artist?.category?.name}</p>
                  {ArtistId && ArtistId === artist.id ? (
                    <button
                      className={styles.effect_withoutbackgroud}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  ) : (
                    <button
                      className={styles.effect}
                      onClick={() => handleSwitch(artist.id)}
                    >
                      Switch
                    </button>
                  )}{' '}
                </div>
              </div>
            ))}
        </div>
        <Footer />
      </div>
    </div>
  )
}
