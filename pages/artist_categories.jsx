/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
// import styles from "../styles/AllCategories.module.css";
import styles from '../styles/ArtistCategories.module.css'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import { useState } from 'react'
import Router, { withRouter } from 'next/router'
import axios from 'axios'
import FeatureArtistCard1 from '../src/higherComponents/FeatureArtistCard1'
import CardSlider1 from '../src/components/slider/CardSlider1'
import { Api } from '../src/config/Config'
import SideBar from '../src/components/sideBar/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'

import Loders from '../src/components/Loader/Loder'
function artist_categories() {
  const [allArtist, setAllArtist] = useState()
  const [allArtistLoader, setAllArtistLoader] = useState(false)
  const [latestArtist, setLatestArtist] = useState()
  const [latestArtistLoader, setLatestArtistLaoder] = useState(false)

  const [categoryList, setCategoryList] = useState()
  const [categoryListLoader, setCategoryListLoader] = useState(false)
  const [selectedCategoryName, setSelectedCategoryName] = useState('All') // Initialize with "All"
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    getAllArtist()
    getLatestArtist()
    getCatrgory()
  }, [])
  const getCatrgory = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + '/api/talent-categories', {})
      .then(function (response) {
        setCategoryList(response?.data?.data)
        setCategoryListLoader(true)
        setLoader(false)
      })
      .catch(function (error) {})
  }
  const talentByCategory = async (id) => {
    await axios
      .get(
        `${baseURL}/api/artists-by-category?category_id=${id}`,

        {},
      )
      .then(function (response) {
        setAllArtist(response?.data?.data)
        setLatestArtist(response?.data?.data)
        setAllArtistLoader(true)
        setLatestArtistLaoder(true)
        setLoader(false)
      })
      .catch(function (error) {})
  }
  const getAllArtist = async () => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + '/api/all-artists', {})
      .then(function (response) {
        setAllArtist(response?.data?.data)
        setAllArtistLoader(true)
        setLoader(false)
      })
      .catch(function (error) {})
  }
  function handleClick(item) {
    Router.push({
      pathname: '/artist_profile',
      query: { item: item?.id },
    })
  }

  const getLatestArtist = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + '/api/latest-content', {})
      .then(function (response) {
        setLatestArtist(response?.data?.data)
        setLatestArtistLaoder(true)
        setLoader(false)
      })
      .catch(function (error) {})
  }
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const dispatch = useDispatch()
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyData,
  )
  useEffect(() => {
    dispatch(fetchCurrency())
  }, [dispatch])

  const filteredData = currencyData?.data.filter((item) => item.status === 1)
  const symbol = []
  filteredData?.forEach((item, index) => {
    symbol.push(item.symbol)
  })
  return (
    <div className={styles.container}>
      {!loader || <Loders />}

      <Topbar />
      <h1>ALL CATEGORIES</h1>

      <div className={styles.sub_container_flex}>
        <div className={styles.sub_container_85}>
          <div className={styles.main_container_90}>
            <div className={styles.container_width_15}>
              {selectedCategoryName !== 'All' ? (
                <h1>Latest {selectedCategoryName}</h1>
              ) : (
                <h1>Latest </h1>
              )}
            </div>
            {categoryListLoader ? (
              <div className={styles.container_width_70_flex}>
                <button
                  onClick={() => {
                    setActiveCategory(null)
                    setSelectedCategoryName('All')
                    getLatestArtist()
                    getAllArtist()
                  }}
                  className={
                    activeCategory === null
                      ? styles.activeButton
                      : styles.buttons
                  }
                >
                  All
                </button>
                {categoryList?.map((item) => (
                  <button
                    onClick={() => {
                      setActiveCategory(item?.id)
                      setSelectedCategoryName(item?.name)
                      talentByCategory(item?.id)
                    }}
                    className={
                      activeCategory === item.id
                        ? styles.activeButton
                        : styles.buttons
                    }
                  >
                    {item?.name}
                  </button>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={styles.container_width_100}>
            {latestArtistLoader ? (
              <CardSlider1 data={latestArtist} symbol={symbol}></CardSlider1>
            ) : (
              ''
            )}
          </div>

          <div className={styles.container_heigt_width_100}>
            <div className={styles.new_actions_width_15}>
              <h1>{selectedCategoryName}</h1>
            </div>
            <div className={styles.display_flex_wrap}>
              {allArtistLoader ? (
                <>
                  {allArtist
                    .slice()
                    ?.sort((a, b) => a.nick_name.localeCompare(b.nick_name))
                    ?.map((item) => (
                      <div className={styles.feature_artist_card_margin}>
                        <FeatureArtistCard1
                          onChildClick={() => {
                            handleClick(item)
                          }}
                          name={item?.nick_name}
                          category={item?.category?.name}
                          rating={item?.avg_ratting}
                          price={item?.service_charges[0]?.price}
                          symbol={symbol}
                          artistImg={`${baseURL}/${item?.profile_image}`}
                        />
                      </div>
                    ))}
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default artist_categories
