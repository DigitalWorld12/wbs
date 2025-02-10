import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import Footer from '../src/components/footer/Footer'
import Slider from '../src/components/slider/Slider'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import AddBaner from '../src/components/slider/AddBaner'
import ReadyToBaner from '../src/components/slider/ReadyToBaner'
import HowItWorks from '../src/components/slider/HowItWorks'
import Testimonials from '../src/components/slider/Testimonials'
import axios from 'axios'
import CategoriesToExplore from '../src/components/slider/CategoriesToExplore'
import FeatureVideo from '../src/components/slider/FeatureVideo'
import TrendingTalents from '../src/components/slider/TrendingTalents'
import ViewedTalents from '../src/components/slider/ViewedTalents'
import localStorage from 'local-storage'
import SuggestedTalents from '../src/components/slider/SuggestedTalents'
import LatestTalents from '../src/components/slider/LatestTalents'
import Topbar from '../src/components/topbar/Topbar'
import imageSrc from '../src/Asset/Images/luxadd.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'
import Loders from '../src/components/Loader/Loder'
import Image from 'next/image'
import whatsApp from '@/Asset/Images/whatsapp.jpg'
import facebook from '@/Asset/Images/facebook.png'
import SearchBar from '@/components/SearchBar/SearchBar'
import HeaderAddBaner from '@/components/slider/HeaderAddBaner'

function Wbs() {
  const value = 5
  const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#000000',
    padding: theme.spacing(1),
  }))

  const [allArtist, setAllArtist] = useState()
  const [latestArtist, setLatestArtist] = useState()
  const [latestArtistLoader, setLatestArtistLoader] = useState(false)
  const [categoryList, setCategoryList] = useState()
  const [categoryListLoader, setCategoryListLoader] = useState(false)
  const [isNavBarOpen, setIsNavBarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    getAllArtist()
    getLatestArtist()
    getCatrgory()
    getVisitedTalent()
  }, [])

  const getCatrgory = async () => {
    await axios
      .get(
        // Api?.get_CATEGORY

        process.env.NEXT_PUBLIC_BASE_URL + '/api/talent-categories',
        {},
      )
      .then(function (response) {
        setCategoryList(response?.data?.data)
        setCategoryListLoader(true)
      })
      .catch(function (error) {})
  }
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const talentByCategory = async (id) => {
    await axios
      .get(
        `${baseURL}/api/artists-by-category?category_id=${id}`,

        {},
      )
      .then(function (response) {
        setAllArtist(response?.data?.data)
        setLatestArtist(response?.data?.data)

        setLatestArtistLoader(true)
      })
      .catch(function (error) {})
  }
  const getAllArtist = async () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/all-artists',

        {},
      )
      .then(function (response) {
        setAllArtist(response?.data?.data)
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
      .get(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/latest-content',

        {},
      )
      .then(function (response) {
        setLatestArtist(response?.data?.data)

        setLatestArtistLoader(true)
        // setLoader(false);
      })
      .catch(function (error) {})
  }
  //artist by category end

  //feature video start
  const [videos, setVideos] = useState([])
  const [period, setPeriod] = useState('day')
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/feature-videos?filter_by=${period}`,
      )

      setVideos(response?.data?.data || [])
      // setLoader(false);
    } catch (error) {
      console.error('Error fetching data:', error)
      // setVideos([]);
    }
  }
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod)
  }

  //feature video end

  //visited talent start
  const [visitedTalents, setVisitedTalents] = useState(null)
  const [viewedTalentsLoader, setViwedTalentsLoader] = useState(null)

  const getVisitedTalent = async () => {
    const response = await localStorage?.get('visitedArtist')
    setVisitedTalents(response)
  }
  //visited talent end
  const [banner, setBanner] = useState()
  const [sliderSectionLoader, setSliderSectionLoader] = useState(false)
  const [baseUrl, setBaseUrl] = useState()
  const GetBanner = async () => {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + '/api/slider')
        .then((response) => {
          setBanner(response.data?.data[0]?.slider_slides)
          setBaseUrl(response.data?.base_url)
          setLoader(false)

          setSliderSectionLoader(true)
        })
        .catch((error) => {
          toast.error(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetBanner()
  }, []) //Currency
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
    <>
      {latestArtistLoader ? (
        <div className={styles.home_main}>
          {/* """"""""""""Slider""""""""""""""""""""" */}
          <div>
            {!loader || <Loders />}

            <Topbar
              isNavBarOpen={isNavBarOpen}
              setIsNavBarOpen={setIsNavBarOpen}
            />
            <SearchBar
              isNavBarOpen={isNavBarOpen}
              setIsNavBarOpen={setIsNavBarOpen}
            />
            <ToastContainer className="tost" />

            {sliderSectionLoader ? (
              <Slider dataBanner={banner} dataBaseUrl={baseUrl} />
            ) : (
              ''
            )}

            {/* """"""""""""categories_explore_section""""""""""""""""""""" */}

            <div className={styles.categories_explore_section}>
              <div className={styles.categories_explore_section_sub1}>
                <h1>Categories To Explore</h1>
              </div>
              {categoryListLoader ? (
                <div className={styles.categories_explore_section_sub2}>
                  <button
                    onClick={() => {
                      getLatestArtist()
                      getAllArtist()
                      setActiveCategory(null)
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
                        talentByCategory(item?.id)
                        setActiveCategory(item?.id)
                      }}
                      key={item.id}
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

              <div className={styles.categories_explore_section_sub3}>
                {latestArtistLoader ? (
                  <CategoriesToExplore
                    data={(latestArtist, allArtist)}
                    symbol={symbol}
                  />
                ) : (
                  ''
                )}
              </div>
              <div className={styles.categories_explore_section_sub4}>
                <Link className={styles.show_more} href="artist_categories">
                  Show More Results
                </Link>
              </div>
            </div>
            <HeaderAddBaner imageSrc={imageSrc} />

            {/* """"""""""""featured_videos_section""""""""""""""""""""" */}

            <div className={styles.latest_content_section}>
              <div className={styles.categories_explore_section_sub1}>
                <h1>Latest Content</h1>
              </div>
              <LatestTalents symbol={symbol} />
            </div>
          </div>

          {/* """"""""""""featured_videos_section""""""""""""""""""""" */}

          <div className={styles.featured_videos_section}>
            <div className={styles.featured_videos_section_sub1}>
              <h1>Featured Videos</h1>
            </div>
            <div className={styles.featured_videos_section_sub2}>
              <FeatureVideo symbol={symbol} />
            </div>
            <div className={styles.featured_videos_section_sub3}>
              <AddBaner imageSrc={imageSrc} />
            </div>
          </div>

          {/* """"""""""""trending_talent_section""""""""""""""""""""" */}

          <div className={styles.trending_talent_section}>
            <div className={styles.trending_talent_section_sub1}>
              <h1>Trending talent</h1>
            </div>

            <div className={styles.trending_talent_section_sub2}>
              <TrendingTalents symbol={symbol} />
            </div>
          </div>

          {/* """"""""""""viewed_talent_section""""""""""""""""""""" */}
          {visitedTalents && (
            <div className={styles.viewed_talent_section}>
              <div className={styles.viewed_talent_section_sub1}>
                <h1>Viewed talent</h1>

                <p>You’ve Viewed These Profiles So Far</p>
              </div>
              <div className={styles.viewed_talent_section_sub2}>
                <ViewedTalents data={visitedTalents} symbol={symbol} />
              </div>
            </div>
          )}

          {/* """"""""""""suggested_talent_section""""""""""""""""""""" */}

          <div className={styles.suggested_talent_section}>
            <div className={styles.categories_explore_section_sub1}>
              <h1>Suggested Talent</h1>
            </div>

            <SuggestedTalents data={latestArtist} symbol={symbol} />
          </div>

          {/* """"""""""""ready_to_section""""""""""""""""""""" */}
          <div>
            <ReadyToBaner />
          </div>
          {/* """"""""""""how_it_works_section""""""""""""""""""""" */}
          <div>
            <HowItWorks />
          </div>
          {/* """"""""""""testimonials_section""""""""""""""""""""" */}
          <div>
            <Testimonials />
          </div>

          {/* """"""""""""Footer""""""""""""""""""""" */}

          <Footer />

          <Link href="#" target="_blank" className={styles.whatsApp_chat}>
            <Image src={whatsApp} alt="Picture of the Logo" />
          </Link>
          <Link href="#" target="_blank" className={styles.facebook_chat}>
            <Image src={facebook} alt="Picture of the Logo" />
          </Link>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
export default Wbs
