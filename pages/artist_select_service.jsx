/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import styles from '../styles/ArtistSelectService.module.css'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import SelectFullWidth from '../src/higherComponents/SelectFullWidth'
import Table from '@mui/material/Table'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import FullWidthTextfield from '../src/higherComponents/FullWidthTextField'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import { reactLocalStorage } from 'reactjs-localstorage'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'

function artist_select_service() {
  const router = useRouter()
  useEffect(() => {
    const data = reactLocalStorage.getObject('loginAuth')

    if (Object.keys(data).length === 0) {
      router.push('/login')
    }
  }, [])
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const [artistServiceCharges, setArtistServiceCharges] = useState('')
  const [deliveryDays, setDeliveryDays] = useState('')
  const [testId, setTestId] = useState(1)
  const [artists, setArtists] = useState([])
  const [serviceStatus, setServiceStatus] = useState(false)
  const [click, setOnclick] = useState(false)
  const [artistsService, setArtistsService] = useState([])

  function getServiceNameById(serviceId) {
    const service = servicesDD.find((item) => item.id === serviceId)
    return service ? service.type : ''
  }

  const [services, setServices] = useState('')
  const [servicesDD, setServicesDD] = useState([])
  const [loading, setLoading] = useState(false)
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
        setArtistsService(response?.data?.data?.service_charges)

        setLoading(true)
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
  const getCatrgory = () => {
    axios
      .get(`${baseURL}/api/service-types`)
      .then(function (response) {
        if (response?.data?.status === true) {
          setServicesDD(response?.data?.data)
        }
      })
      .catch(function (error) {})
  }
  useEffect(() => {
    getCatrgory()
    getArtistData()
  }, [])
  useEffect(() => {
    routeScreen()
  }, [serviceStatus])
  const handleSubmission = async (event) => {
    setOnclick(true)
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token
    const user_id = data?.user?.id
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    event.preventDefault()

    if (!serviceStatus) {
      await axios
        .post(
          process.env.NEXT_PUBLIC_BASE_URL + '/api/artist/service_charges',
          {
            artist_id: artistId,
            user_id: user_id,
            services: artists,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(function (response) {
          if (response?.data?.status === true) {
            setServiceStatus(true)
            toast.success(
              response?.data?.message
                ? response?.data?.message
                : response?.data?.error,
            )
          }
          if (response?.data?.status === false) {
            toast.error(
              response?.data?.message
                ? response?.data?.message
                : response?.data?.error,
            )
          }
        })
        .catch(function (error) {
          toast.error(
            error?.response?.data?.errors?.services
              ? error?.response?.data?.errors?.services
              : `${error?.response?.data?.message} please login again`,
          )
          setOnclick(false)
        })
    }
  }

  const routeScreen = () => {
    if (serviceStatus === true) {
      router.push('/artist_signup_thankyou')
      setOnclick(false)
    }
  }
  const deleteArtistData = async (artist_service_id) => {
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/delete-service-charges`,
        {
          artist_service_id: artist_service_id,
          artist_id: artistId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.data.status === true) {
        // console.log(response, "test");
        toast.success(response?.data?.message)
        getArtistData()
      }
      if (response?.data?.data?.status === false) {
        toast.warn(response?.data?.data?.message)
      }
    } catch (error) {}
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

        <h1 className={styles.main_heading}>Update your Services</h1>

        <div className={styles.content_box}>
          <div className={styles.sub_content_box}>
            <h2 className={styles.h}>Instructions of recording</h2>

            <p className={styles.p}>
              Hello Wish By Star! To craft the perfect video for you, I thrive
              on your guidance. When requesting, share your thoughts,
              preferences, and any special details. Your input ensures a video
              that truly resonates with you. Let's create something amazing
              together!
            </p>
            <SelectFullWidth
              value={services}
              setValue={setServices}
              dropDownValues={servicesDD}
              placeholder="Select Services..."
            />

            <FullWidthTextfield
              type={'number'}
              placeholder={'Charges of this service'}
              value={artistServiceCharges}
              setValue={setArtistServiceCharges}
            />
          </div>

          <button
            disabled={artistServiceCharges === '' ? true : false}
            className={styles.btn}
            onClick={() => {
              setArtistServiceCharges('')
              setTestId(testId + 1)
              artists.push({
                serviceId: services,
                service_charges: artistServiceCharges,
                delivery_days: deliveryDays,
              })
            }}
          >
            Add More Services
          </button>
          {loading && (
            <div className={styles.sub_content_box}>
              {artistsService?.length > 0 && (
                <h2 className={styles.h}>Services Offering</h2>
              )}
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    {artists?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className={styles.h}>
                          {getServiceNameById(item?.serviceId)}
                        </TableCell>
                        <TableCell className={styles.h}>
                          {symbol ? symbol : ''}

                          {item?.service_charges
                            ? parseInt(item?.service_charges) >= 1000
                              ? parseInt(item?.service_charges).toLocaleString()
                              : item?.service_charges
                            : '0'}
                        </TableCell>
                        <TableCell className={styles.h} align="right">
                          <DeleteIcon
                            className={styles.icon}
                            onClick={() => {
                              setArtists(
                                artists?.filter(
                                  (a) => a?.serviceId !== item?.serviceId,
                                ),
                              )
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableHead>
                </Table>
              </TableContainer>

              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    {artistsService?.map((items) => (
                      <TableRow key={items.id}>
                        {console.log(items, 'testing')}
                        <TableCell className={styles.h}>
                          {/* {items?.order_type_id} */}
                          {getServiceNameById(items?.order_type_id)}
                        </TableCell>
                        <TableCell className={styles.h}>
                          {symbol ? symbol : ''}

                          {/* {items?.price} */}
                          {items?.price
                            ? parseInt(items?.price) >= 1000
                              ? parseInt(items?.price).toLocaleString()
                              : items?.price
                            : '0'}
                        </TableCell>
                        <TableCell className={styles.h}>
                          {items?.status}
                        </TableCell>
                        <TableCell className={styles.h} align="right">
                          {/* <MoreVertIcon /> */}
                          <DeleteIcon
                            className={styles.icon}
                            onClick={() => {
                              deleteArtistData(items?.id)
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableHead>
                </Table>
              </TableContainer>
            </div>
          )}

          <button
            className={styles.btn}
            style={{
              display: click ? 'none' : '',
            }}
            onClick={handleSubmission}
          >
            Confirm
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default artist_select_service
