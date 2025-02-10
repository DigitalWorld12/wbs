/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from 'react'
import styles from '../styles/ArtistOrder.module.css'
import Image from 'next/image'
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import dynamic from 'next/dynamic'
import CircleIcon from '@mui/icons-material/Circle'

import SelectDropDown from '../src/higherComponents/SelectDropDown'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import axios from 'axios'
import { sessionStorage } from 'local-storage'

import CircularProgress from '@mui/material/CircularProgress'
import localStorage from 'local-storage'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import KnowMoreAboutCompeletedOrder from '@/components/Artist Dashboard/KnowMoreAboutCompeletedOrder'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'
import { reactLocalStorage } from 'reactjs-localstorage'
import { refreshAuth } from '@/redux/actions/authActions'

const ArtistOrderCompleting = dynamic(
  () => import('../src/components/reactRecorder/OrderCompleteVideoRecord'),
  { ssr: false },
)
function artist_order() {
  const router = useRouter()
  const { order_id } = router.query
  const [open, isOpen] = useState(false)
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const fase = 12
  const [order, setOrder] = useState(null)
  const [orderLoader, setOrderLoader] = useState(false)

  const getOrder = () => {
    axios
      .get(
        `${baseURL}/api/artist/order-details?order_id=${order_id}`,

        {
          headers: {
            Authorization:
              'Bearer ' + localStorage.get('loginAuth')?.authorisation?.token,
          },
        },
      )
      .then(function (response) {
        if (response?.data?.status === true) {
          setOrder(response?.data?.data)
          setOrderLoader(true)
          localStorage.set('orderData', response?.data?.data)
        }
        if (response?.data?.status === false) {
          router.push('/artist_dashboard')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    getOrder()
  }, [])
  useEffect(() => {
    const storedOrderData = localStorage.get('orderData')
    const storedOrderId = localStorage.get('order_id')

    if (storedOrderId && storedOrderData) {
      setOrder(storedOrderData)
      setOrderLoader(true)
    } else if (order_id) {
      localStorage.set('order_id', order_id)
      getOrder()
    } else {
    }
  }, [])

  // ...

  const handleClick = () => {
    isOpen(!open)
  }

  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [videoSize, setVideoSize] = useState('')
  const [videoDuration, setVideoDuration] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [click, setOnclick] = useState(false)

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024)
      setVideoSize(`${fileSizeInMB.toFixed(2)} MB`)
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
      const videoElement = document.createElement('video')
      videoElement.preload = 'metadata'
      videoElement.src = URL.createObjectURL(file)
      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration
        if (duration > 32) {
          toast.warn('Video should be less than 30 seconds.')
          setVideoFile(null)
          setVideoPreview(null)
          setVideoSize('')
          setVideoDuration('')
        } else {
          setVideoDuration(`${duration.toFixed(2)} seconds`)
        }
      }
    }
  }
  const handleFileUpload = async () => {
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    if (videoFile) {
      setIsLoading(true)
      try {
        const formData = new FormData()
        formData.append('artist_id', artistId)
        formData.append('order_id', order_id)
        formData.append('video', videoFile)
        const response = await axios.post(
          `${baseURL}/api/artist/order-complete`,

          formData,
          {
            headers: {
              Authorization:
                'Bearer ' + localStorage.get('loginAuth')?.authorisation?.token,
            },
          },
        )

        if (response?.data?.status === true) {
          toast.success(response?.data?.message)
          router.push({
            pathname: '/artist_order_completed_thankyou',
          })
        } else if (response?.data?.status === false) {
          router.push({
            pathname: '/login',
          })
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to upload video.')
      } finally {
        setIsLoading(false)
      }
    }
  }
  const authData = useSelector((state) => state.authReducer.authData)
  useEffect(() => {
    if (authData) {
      reactLocalStorage.setObject('loginAuth', authData)
    }
  }, [authData])
  const handleDeletePreview = () => {
    setVideoFile(null)
    setVideoPreview(null)
    setVideoSize('')
    setVideoDuration('')
  }

  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setPlaying(true)
    } else {
      videoRef.current.pause()
      setPlaying(false)
    }
  }
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
      <div className={styles.container}>
        <Topbar />
        <ToastContainer className="tost" />
        <h1 className={styles.artist_order_heading_h1}>
          RECORD YOUR ORDER VIDEO
        </h1>
        <div className={styles.artist_order_width_60}>
          <div className={styles.content}>
            <div className={styles.flex}>
              <h3 className={styles.artist_order_color_white}>
                Pending Orders
              </h3>
              <h3 className={styles.artist_order_color_white}>
                {orderLoader ? <>{order?.unique_id}</> : ''}
              </h3>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.artist_order_color_white}>For</h3>
              <p className={styles.artist_order_color_white}>
                {orderLoader ? <>{order?.send_type}</> : ''}
              </p>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.artist_order_color_white}>Dedicated by</h3>
              <p className={styles.artist_order_color_white}>
                {orderLoader ? <>{order?.from}</> : ''} (
                {orderLoader ? <>{order?.pronoun_from}</> : ''})
              </p>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.artist_order_color_white}>Dedicated To</h3>
              <p className={styles.artist_order_color_white}>
                {orderLoader ? <>{order?.to}</> : ''} (
                {orderLoader ? <>{order?.pronoun_to}</> : ''})
              </p>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.artist_order_color_white}>Occasion type</h3>
              <p className={styles.artist_order_color_white}>
                {orderLoader ? <>{order?.occasion?.name}</> : ''}
              </p>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.artist_order_color_white}>Message</h3>
              <p className={styles.artist_order_color_white}>
                {orderLoader ? <>{order?.message}</> : ''}
              </p>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.artist_order_color_white}>Delivery Date</h3>
              <p className={styles.artist_order_color_white}>
                {orderLoader ? <>{order?.delivery_date}</> : ''}
              </p>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.artist_order_color_white}>
                Service Earning
              </h3>
              <p className={styles.artist_order_color_white}>
                {orderLoader ? (
                  <>
                    {symbol ? symbol : ''}

                    {order?.service_earning
                      ? parseInt(order?.service_earning) >= 1000
                        ? parseInt(order?.service_earning).toLocaleString()
                        : order?.service_earning
                      : '0'}
                  </>
                ) : (
                  ''
                )}
              </p>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.artist_order_color_white}>Status</h3>

              <p className={styles.artist_order_color_white}>
                {orderLoader ? <>{order?.status}</> : ''}
              </p>
            </div>
          </div>

          <h2 className={styles.artist_order_color_alignself}>Process Order</h2>

          <div className={styles.artist_order_width_80}>
            <div className={styles.artist_order_width_47}>
              {open ? (
                <ArtistOrderCompleting order_id={order_id} />
              ) : (
                <div className={styles.artist_recording_height_100}>
                  <Image
                    src={require('../src/Asset/Images/videoRecorder.png')}
                    alt="Picture of the author"
                    width={'100%'}
                    height={'100%'}
                  />
                  <button
                    onClick={handleClick}
                    className={styles.artist_order_button_Rec}
                  >
                    REC
                    <CircleIcon />
                  </button>
                </div>
              )}
            </div>

            <div className={styles.artist_order_width_height_100}>
              <div className={styles.artist_order_margintop_flexdirection}>
                <SelectDropDown />
                <FormGroup>
                  <FormControlLabel
                    className={styles.artist_recording_formControlLabel}
                    control={
                      <Checkbox
                        labelStyle={{ color: '#CEA234' }}
                        iconStyle={{ fill: '#CEA234' }}
                        inputStyle={{ color: '#CEA234' }}
                        style={{ color: '#CEA234' }}
                        defaultChecked
                      />
                    }
                    label="Cam + Audio"
                  />
                </FormGroup>

                {videoPreview === null && (
                  <label
                    name="video"
                    className={styles.artist_recording_height_50_input}
                  >
                    Upload Video
                    <input
                      name="video"
                      style={{ display: 'none' }}
                      type="file"
                      accept="video/*"
                      onChange={handleFileInputChange}
                      className={styles.artist_recording_height_50_input}
                    />
                  </label>
                )}

                <Box
                  sx={{
                    display: click ? 'flex' : 'none',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
                {videoPreview && (
                  <>
                    <button
                      className={styles.artist_order_button_Upload}
                      style={{
                        display: click ? 'none' : '',
                      }}
                      onClick={handleFileUpload}
                    >
                      {isLoading ? 'Loading...' : 'Upload'}
                    </button>

                    <button
                      className={styles.artist_order_button_Upload}
                      style={{
                        display: click ? 'none' : '',
                      }}
                      onClick={handleDeletePreview}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            {videoPreview && (
              <>
                <div className={styles.video_parent}>
                  <video
                    ref={videoRef}
                    controls={false}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    style={{
                      borderRadius: '10px',
                      boxShadow: 'revert',
                    }}
                    className={styles.artist_order_video}
                    src={videoPreview}
                  ></video>
                  <button className={styles.play_button} onClick={togglePlay}>
                    {playing ? (
                      <PauseIcon className={styles.icon} />
                    ) : (
                      <PlayArrowIcon className={styles.icon} />
                    )}
                  </button>
                </div>
                <p style={{ color: '#fff', textAlign: 'center' }}>
                  Size: {videoSize}
                </p>
                <p style={{ color: '#fff', textAlign: 'center' }}>
                  Duration: {videoDuration}
                </p>
              </>
            )}
          </div>
        </div>

        <KnowMoreAboutCompeletedOrder />

        <Footer />
      </div>
    </>
  )
}
export default artist_order
