/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/ArtistRecording.module.css'
import Image from 'next/image'
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import dynamic from 'next/dynamic'
import CircleIcon from '@mui/icons-material/Circle'
import { Select } from '@mui/material'
import SelectDropDown from '../src/higherComponents/SelectDropDown'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useRouter } from 'next/router'
import { display, padding } from '@mui/system'
import KnowMoreAboutRecording from '../src/components/Artist Dashboard/KnowMoreAboutRecording'
import VideoUploader from '../src/components/VideoUpload'
import localStorage from 'local-storage'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

function artist_recording() {
  const [open, isOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isFilePicked, setIsFilePicked] = useState(false)
  const [click, setOnclick] = useState(false)
  const [videoData, setVideoData] = useState(false)
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter()
  const Recorder = dynamic(
    () => import('../src/components/reactRecorder/ReactRecorder'),
    {
      ssr: false,
    },
  )
  useEffect(() => {
    getArtistData()
  }, [])
  const [webcam, setWebcam] = useState()
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
  }
  const handleSubmission = async (event) => {
    setOnclick(true)
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token
    const user_id = data?.user?.id
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id

    event.preventDefault()
    const formData = new FormData()
    formData.append('video_file', selectedFile)
    formData.append('atrist_id', artistId)
    try {
      const response = await axios({
        method: 'post',

        url:
          process.env.NEXT_PUBLIC_BASE_URL + '/api/artist/first_video_record',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer  ${token}`,
        },
      })
      if (response?.data?.status === true) {
        if (data !== '' && data?.user?.user_type === 'user') {
          router.push('/artist_service_charges')
        } else if (data !== '' && data?.user?.user_type === 'artist') {
          toast.warn(
            `${response?.data?.message}, Please login again to see your changes`,
          )
          router.push('/')
        }
      } else {
        toast.success(response?.data?.message)
        setOnclick(false)
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.errors?.video_file
          ? error?.response?.data?.errors?.video_file[0]
          : `${error?.response?.data?.message} please login again`,
      )
      setOnclick(false)
    }
  }

  const getArtistData = async () => {
    const data = reactLocalStorage.getObject('loginAuth')
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    const token = data?.authorisation?.token
    const userId = data?.user?.id
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?user_id=${userId}&artist_id=${artistId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        setVideoData(response?.data?.data?.videos)
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized')
          reactLocalStorage?.remove('loginAuth')
          router.push('/login')
        } else {
          console.error('Error: ', error)
        }
      })
  }
  const deleteArtistData = async (id) => {
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token
    await axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + 'api/artist/video-delete/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        toast.success(response?.data?.message)
        setVideoData((prevVideoData) =>
          prevVideoData.filter((item) => item.id !== id),
        )
      })
      .catch(function (error) {})
  }
  const handleClick = () => {
    isOpen(!open)
  }

  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [videoSize, setVideoSize] = useState('')
  const [videoDuration, setVideoDuration] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
        formData.append('video_file', videoFile)
        formData.append('artist_id', artistId)

        axios
          .post(
            process.env.NEXT_PUBLIC_BASE_URL + '/api/artist/first_video_record',
            formData,
            {
              headers: {
                Authorization:
                  'Bearer ' +
                  localStorage.get('loginAuth')?.authorisation?.token,
              },
            },
          )
          .then((response) => {
            if (response?.data?.status === true) {
              toast.success(response?.data?.message)
              router.push({
                pathname: '/artist_service_charges',
              })
            }
            if (response?.data?.status === false) {
              toast.warn(response?.data?.message)
            }
          })
          .catch((error) => {
            toast.error(error)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } catch (error) {
        toast.error('Failed to upload video.')
      }
    }
  }

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

  const toggleVideoStatus = async (videoItem) => {
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-video-active`,
        {
          video_id: videoItem.id,
          artist_id: videoItem.artist_id,
          is_active: videoItem.is_active === 1 ? 0 : 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response?.data?.status === true) {
        setVideoData((prevVideoData) =>
          prevVideoData.map((item) =>
            item.id === videoItem.id
              ? { ...item, is_active: videoItem.is_active === 1 ? 0 : 1 }
              : item,
          ),
        )
        window.location.reload()
        toast.success(response?.data?.message)
      } else {
        toast.warn(response?.data?.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
      <div className={styles.container}>
        <Topbar />
        <ToastContainer className="tost" />
        <h1 className={styles.artist_recording_heading_h1}>
          RECORD YOUR FIRST SHOUTOUT
        </h1>

        <div className={styles.artist_recording_width_70}>
          <div
            className={
              styles.artist_recording_width_75_marginleft_paddingtop_40
            }
          >
            <h2 className={styles.artist_recording_heading_color}>
              Instructions For Recording
            </h2>

            <p className={styles.artist_recording_color_fontsize_paragraph}>
              Creating exciting content for our customers is our passion. Your
              enthusiasm and energy can brighten their day, forging a lasting
              connection that keeps them coming back for more. Let's inspire,
              entertain, and make every moment memorable!
            </p>
          </div>

          <div className={styles.artist_recording_width_80}>
            <div className={styles.artist_recording_width_47}>
              {open ? (
                <Recorder />
              ) : (
                <div className={styles.artist_recording_height_100}>
                  <Image
                    src={require('../src/Asset/Images/videoRecorder.png')}
                    alt="Picture of the author"
                    width={'100%'}
                    height={'100%'}
                  />
                  <button
                    className={styles.artist_recording_button_rec}
                    onClick={handleClick}
                  >
                    REC
                    <CircleIcon />
                  </button>
                </div>
              )}
            </div>
            <div className={styles.artist_recording_width_47_height_100}>
              <div
                className={
                  styles.artist_recording_margintop_40_disply_flexDirection
                }
              >
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
                      className={styles.artist_recording_button_upload}
                      style={{
                        display: click ? 'none' : '',
                      }}
                      onClick={handleFileUpload}
                    >
                      {/* Upload */}
                      {isLoading ? 'Loading...' : 'Upload'}
                    </button>

                    <button
                      className={styles.artist_recording_button_upload}
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

          {/* video uplaod start */}
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
                    src={videoPreview}
                  />
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
          {/* webcam */}
          {/* video upload end */}
          <div className={styles.artist_recording_width_heigt_100}>
            {videoData &&
              videoData?.map((item) => (
                <div
                  className={styles.artist_recording_video_data_width_height}
                >
                  <video controls width={300} height={500}>
                    <source
                      src={`${baseURL}/${item?.video_url}`}
                      type="video/mp4"
                    />
                  </video>
                  <button
                    className={styles.artist_recording_height_50_input}
                    onClick={() => toggleVideoStatus(item)}
                  >
                    {item.is_active === 1 ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    className={styles.artist_recording_height_50_input}
                    onClick={() => {
                      deleteArtistData(item?.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>

        <KnowMoreAboutRecording />
      </div>
      <Footer />
    </>
  )
}
export default artist_recording
