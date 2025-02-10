/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import styles from '../../../styles/ArtistProfile.module.css'
import Link from 'next/link'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import Router, { withRouter } from 'next/router'
import localStorage from 'local-storage'
import Image from 'next/image'
import FeatureVideoCard from '@/higherComponents/FeatureVideoCard'
import { SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'
import FeatureVideoCardOnlyVideo from '@/higherComponents/FeatureVideoCardOnlyVideo'
import { isArray } from 'util'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#000000',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
}))
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}
export default function Artist_Profile({ data }) {
  const platformCommission = data?.platform_commission
    ? data?.platform_commission
    : 0

  const [faqs, setFaqs] = React.useState()

  React.useEffect(() => {
    getFAQS()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  let tagsArray = null // Use 'let' instead of 'const' to allow reassignment

  if (isArray(data?.tags)) {
    tagsArray = data?.tags
  } else {
    const tagsString = data?.tags || ''
    tagsArray = tagsString.split(',').map((tag) => tag.trim())
  }

  const getFAQS = async () => {
    let faqsSeqData = []
    await axios
      .get(
        process.env.NEXT_PUBLIC_BASE_URL +
          '/api/faq-by-talent?category_id=' +
          data?.category_id,

        {},
      )
      .then(function (response) {
        response?.data?.data.map((faqs) => {
          data?.artist_answer.map((ans) => {
            if (ans?.faq_id === faqs?.id) {
              faqsSeqData?.push({ faqs, ans })
            }
            setFaqs(faqsSeqData)
          })
        })
      })
      .catch(function (error) {})
  }
  const activeVideos = data.videos.filter((video) => video.is_active === 1)

  const value = 5
  const avgRating =
    data?.avg_ratting?.length > 0
      ? data?.avg_ratting[0]?.avg_rating.toFixed(1)
      : '3.0'

  const dispatch = useDispatch()
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyData,
  )
  React.useEffect(() => {
    dispatch(fetchCurrency())
  }, [dispatch])
  const filteredData = currencyData?.data.filter((item) => item.status === 1)
  const symbol = []
  filteredData?.forEach((item, index) => {
    symbol.push(item.symbol)
  })

  return (
    <div className={styles.artist_profile_main}>
      <div className={styles.artist_profile_card}>
        {/* """""""""""""""start""""""""""""""" */}
        <div className={styles.artist_profile_card_left}>
          {data !== undefined && activeVideos.length > 0 ? (
            <div style={{ width: '100%' }}>
              <div style={{ width: '100%' }}>
                {activeVideos.map((video) => (
                  <div
                    key={video.id}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <FeatureVideoCardOnlyVideo
                      imgUrl={`${baseURL}/${video.video_url}`}
                      data={video}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Image
              src={`${baseURL}/${data?.profile_image}` || placeholder}
              alt=""
              width={1000}
              height={300}
            />
          )}
        </div>
        {/* """""""""""""""end""""""""""""""" */}

        {/* """""""""""""""start""""""""""""""" */}
        <div className={styles.artist_profile_card_right}>
          {/* """""""""""""""""""""""""""""" */}
          <div className={styles.artist_profile_card_right_sub1}>
            <h3 className={styles.actor_name}>
              {data?.nick_name ? data?.nick_name : 'Actor Name'}
            </h3>
            <div>
              <p>{data?.avg_ratting?.length} Reviews</p>
              <Rating
                name="text-feedback"
                value={avgRating}
                readOnly
                precision={1}
                emptyIcon={
                  <StarIcon style={{ opacity: 1.55 }} fontSize="inherit" />
                }
              />
            </div>
          </div>
          {/* """""""""""""""end""""""""""""""" */}

          {/* """""""""""""""start""""""""""""""" */}

          <div className={styles.artist_profile_card_right_sub2}>
            {tagsArray?.map((tag, index) => (
              <Link className={styles.actor_routes} key={index} href="#">
                {/* Popularity */}
                {tag}
              </Link>
            ))}
            <Link className={styles.actor_routes} href="#">
              {data?.nick_name ? data?.nick_name : 'Actor Nick Name'}
            </Link>

            <Link className={styles.actor_routes} href="#">
              {data?.documents ? data?.documents[0]?.title : 'Actor Awards'}
            </Link>
          </div>
          {/* """""""""""""""end""""""""""""""" */}

          {/* """""""""""""start""""""""""""""""" */}
          <div className={styles.artist_profile_card_right_sub3}>
            <p className={styles.actor_content_text}>
              {data?.bio ? data?.bio : 'Loading.......'}
            </p>
            <p className={styles.actor_booking}></p>
          </div>

          {/* """""""""""""""end""""""""""""""" */}

          {/* """""""""""""start""""""""""""""""" */}
          {data?.service_charges?.map((item) => (
            <>
              <div className={styles.artist_profile_card_right_sub4}>
                <div className={styles.services_sec}>
                  <h2>Services</h2>
                  <p>{item?.service?.description}</p>
                </div>
                <div>
                  <div
                    onClick={() => {
                      if (localStorage.get('loginAuth')?.authorisation?.token) {
                        Router.push({
                          pathname: '/artist_request_to_person',
                          query: {
                            talent_id: data?.id,
                            service_id: item?.id,
                            service_charges: item?.price,
                            commission: item?.commission,
                            talent_name: data?.name,
                            platform_commission: JSON.stringify(
                              platformCommission,
                            ),
                          },
                        })
                      } else {
                        Router.push({
                          pathname: '/login',
                        })
                      }
                    }}
                  >
                    <Button
                      className={styles.actor_req_video}
                      variant="outlined"
                    >
                      Req Video {symbol ? symbol : ''}
                      {item?.price
                        ? parseInt(item?.price) >= 1000
                          ? parseInt(item?.price).toLocaleString()
                          : item?.price
                        : '0'}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ))}

          {/* Static service card for business */}
          <div className={styles.artist_profile_card_right_sub4}>
            <div className={styles.services_sec}>
              <h2>Business Services</h2>
              <p>Static business service description</p>
            </div>
            <div>
              <div
                onClick={() => {
                  if (localStorage.get('loginAuth')?.authorisation?.token) {
                    Router.push({
                      pathname: '/promote_your_business',
                      query: {
                        talent_id: data?.id,

                        talent_name: data?.name,
                      },
                    })
                  } else {
                    Router.push({
                      pathname: '/login',
                    })
                  }
                }}
              >
                <Button className={styles.actor_req_video} variant="outlined">
                  Static Business Service Price
                </Button>
              </div>
            </div>
          </div>
          {/* """""""""""""""end""""""""""""""" */}
        </div>
      </div>
    </div>
  )
}
