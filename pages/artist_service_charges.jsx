/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import styles from '../styles/ArtistServiceCharges.module.css'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import SelectFullWidth from '../src/higherComponents/SelectFullWidth'
import Table from '@mui/material/Table'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import FullWidthTextfield from '../src/higherComponents/FullWidthTextField'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Api } from '../src/config/Config'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'

function artist_service_charges() {
  const [artistServiceCharges, setArtistServiceCharges] = useState('')
  const [deliveryDays, setDeliveryDays] = useState('')
  const [title, setTitle] = useState()
  const [testId, setTestId] = useState(1)
  const [artists, setArtists] = useState([])
  const [document, setDocument] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [services, setServices] = useState('')
  const [servicesDD, setServicesDD] = useState([])
  const [serviceStatus, setServiceStatus] = useState(false)
  const [certificateStatus, setCertificateStatus] = useState(false)
  const [click, setOnclick] = useState(false)
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter()

  useEffect(() => {
    getCatrgory()
  }, [])
  useEffect(() => {
    routeScreen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceStatus, certificateStatus])

  const getCatrgory = () => {
    axios
      .get(`${baseURL}/api/service-types`)
      .then(function (response) {
        setServicesDD(response?.data?.data)
      })
      .catch(function (error) {})
  }
  const changeHandler = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
      if (allowedTypes.includes(selectedFile.type)) {
        setSelectedFile(selectedFile)
      } else {
        toast.error(
          'Unsupported file type. Please select a PNG, JPG, or PDF file.',
        )
      }
    }
  }
  function getServiceNameById(serviceId) {
    const service = servicesDD.find((item) => item.id === serviceId)
    return service ? service.type : ''
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
    document.map((item) => {
      formData.append('artist_id', artistId)
      formData.append('user_id', user_id)
      formData.append('title[]', item?.title)
      formData.append('file[]', item?.file)
    })

    if (!certificateStatus) {
      try {
        if (formData && formData.getAll('file[]').length > 0) {
          const response = await axios({
            method: 'post',

            url:
              process.env.NEXT_PUBLIC_BASE_URL +
              '/api/artist/registration_certificates',

            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer  ${token}`,
            },
          })
          if (response?.data?.status === true) {
            toast.success(
              response?.data?.message
                ? response?.data?.message
                : response?.data?.error,
            )

            setCertificateStatus(true)
          }
          if (response?.data?.status === false) {
            toast.error(
              response?.data?.message
                ? response?.data?.message
                : response?.data?.error,
            )
          }
        } else {
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.errors?.title
            ? error?.response?.data?.errors?.title
            : `${error?.response?.data?.message} please login again`,
        )
        setOnclick(false)
      }
    }

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
            router.push('/artist_register_thankyou')
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
    if (serviceStatus === true && certificateStatus === true) {
      router.push('/artist_signup_thankyou')
      setOnclick(false)
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

        <div className={styles.line}></div>

        <h1 className={styles.main_heading}>Service Charges</h1>

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
            <FullWidthTextfield
              type={'number'}
              placeholder={'Days of Delivery'}
              value={deliveryDays}
              setValue={setDeliveryDays}
            />
            <button
              className={styles.btn}
              onClick={() => {
                const emptyFields = []
                if (!services) {
                  emptyFields.push('Services')
                }

                if (!artistServiceCharges) {
                  emptyFields.push('Charges')
                }

                if (!deliveryDays) {
                  emptyFields.push('Delivery Days')
                }
                if (emptyFields.length === 0) {
                  setArtistServiceCharges('')
                  setTestId(testId + 1)
                  artists.push({
                    serviceId: services,
                    service_charges: artistServiceCharges,
                    delivery_days: deliveryDays,
                  })
                } else {
                  toast.warn(
                    `Please fill in the following fields: ${emptyFields.join(
                      ', ',
                    )}`,
                  )
                }
              }}
            >
              Add
            </button>

            {artists?.some((item) => item) && (
              <h2 className={styles.h}>Services Offering</h2>
            )}

            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  {artists?.map((item) => (
                    <TableRow>
                      <TableCell className={styles.h}>
                        {/* {item?.name} */}
                        {getServiceNameById(item?.serviceId)}
                      </TableCell>
                      <TableCell className={styles.h}>
                        {symbol ? symbol : ''}

                        {/* {item?.service_charges} */}

                        {item?.service_charges
                          ? parseInt(item?.service_charges) >= 1000
                            ? parseInt(item?.service_charges).toLocaleString()
                            : item?.service_charges
                          : '0'}
                      </TableCell>
                      <TableCell className={styles.h} align="right">
                        {/* <MoreVertIcon/> */}
                        <DeleteIcon
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

            <h2 className={styles.h}>
              Awards / Certificates / Acknowledgements Pictures if any
            </h2>

            <FullWidthTextfield
              placeholder={'Document Title'}
              value={title}
              setValue={setTitle}
            />

            <div className={styles.artist_service_display}>
              <label name="file" className={styles.btn}>
                Upload <UploadFileIcon />
                <input
                  style={{ display: 'none' }}
                  type="file"
                  name="file"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={changeHandler}
                  className={styles.artist_service_input}
                />
              </label>

              <button
                className={styles.btn}
                onClick={() => {
                  const emptyFields = []

                  if (!title) {
                    emptyFields.push('Title')
                  }

                  if (!selectedFile) {
                    emptyFields.push('File')
                  }
                  if (emptyFields.length === 0) {
                    setTestId(testId + 1)
                    document.push({
                      id: testId,
                      title: title,
                      file: selectedFile,
                    })
                    setSelectedFile('')
                    setTitle('')
                  } else {
                    toast.warn(
                      `Please fill in the following fields: ${emptyFields.join(
                        ', ',
                      )}`,
                    )
                  }
                }}
              >
                Add
              </button>
            </div>
          </div>

          <div className={styles.sub_content_box}>
            {document?.some((item) => item) && (
              <h2 className={styles.h}>Uploaded Document</h2>
            )}
            {/* <h2 className={styles.h}>Uploaded Document</h2> */}
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  {document?.map((item) => (
                    <TableRow>
                      <TableCell className={styles.h}>Recorded Video</TableCell>
                      <TableCell className={styles.h}>{item?.title}</TableCell>
                      <TableCell className={styles.h}>
                        {item?.file?.type}
                      </TableCell>
                      <TableCell className={styles.h} align="right">
                        <DeleteIcon
                          onClick={() => {
                            setDocument(
                              document?.filter((a) => a?.id !== item?.id),
                            )
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableHead>
              </Table>
            </TableContainer>
          </div>
          <Box
            sx={{
              display: click ? 'flex' : 'none',
              marginBottom: 10,
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
          <button
            className={styles.artist_service_btn_confirm}
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
export default artist_service_charges
