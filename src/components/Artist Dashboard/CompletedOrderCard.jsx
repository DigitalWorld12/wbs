import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from '../../../styles/OrderCard.module.css'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import { Api } from '../../config/Config'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'

export default function CompletedOrderCard() {
  const [modalData, setModalData] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpenClose = () => setOpen(!open)
  const [orders, setOrders] = useState(null)
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const [ordersLoader, setOrdersLoader] = useState(false)
  const router = useRouter()

  const getOrders = () => {
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    axios
      .get(
        `${baseURL}/api/artist/orders?artist_id=${artistId}`,

        {
          headers: {
            Authorization:
              'Bearer ' +
              reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
          },
        },
      )
      .then((response) => {
        setOrders(response.data.data.complete_orders)
        setOrdersLoader(true)
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
  useEffect(() => {
    getOrders()
  }, [])
  //Currency
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
      <ToastContainer className="tost" />

      <div className={styles.parent_row}>
        <div>
          {ordersLoader && orders.length > 0 ? ( // Check if orders are loaded and the array is not empty
            <h1 className={styles.btnreceivedorder} variant="outlined">
              Completed Order
            </h1>
          ) : null}
        </div>
        <div className={styles.row}>
          {ordersLoader ? (
            <>
              {orders?.slice(0, 4)?.map((cardData) => (
                <div key={cardData?.id}>
                  <Link
                    onClick={() => {
                      handleOpenClose()
                      setModalData(cardData)
                    }}
                    className={styles.card}
                    href="#"
                  >
                    <div className={styles.card_sec}>
                      <h5>
                        {cardData.status.charAt(0).toUpperCase() +
                          cardData.status.slice(1)}
                      </h5>
                    </div>
                    <div className={styles.card_sec2}>
                      <h6 style={{ marginBottom: '5px' }}>Talent Name</h6>
                      <h3>{cardData.sender.name}</h3>
                      {/* Display artist's name */}
                    </div>
                    <div className={styles.card_sec1}>
                      <div>
                        <h6>Order No</h6>
                        <h3>{cardData.unique_id}</h3>
                      </div>
                      <div>
                        <h6>Price</h6>

                        <h3>
                          {symbol ? symbol : ''}
                          {cardData.service_earning
                            ? parseInt(cardData.service_earning) >= 1000
                              ? parseInt(
                                  cardData.service_earning,
                                ).toLocaleString()
                              : cardData.service_earning
                            : '0'}
                        </h3>
                      </div>

                      <div>
                        <h6>Order Date</h6>
                        <h3>{cardData.delivery_date}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            ''
          )}

          <Modal
            open={open}
            onClose={handleOpenClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.box}>
              <button
                className={styles.unitX}
                variant="contained"
                onClick={handleOpenClose}
              >
                X
              </button>
              <div className={styles.box_sub}>
                <h2>{modalData.status}</h2>
                <div>
                  <h4>Name</h4>
                  <h2>{modalData.from}</h2>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <h4>T Id</h4>

                    <h2>{modalData.id}</h2>
                  </div>
                  <div>
                    <h4>Order No</h4>

                    <h2>{modalData.unique_id}</h2>
                  </div>
                  <div>
                    <h4>Price</h4>

                    <h2>
                      {symbol ? symbol : ''}

                      {modalData.service_earning
                        ? parseInt(modalData.service_earning) >= 1000
                          ? parseInt(modalData.service_earning).toLocaleString()
                          : modalData.service_earning
                        : '0'}
                    </h2>
                  </div>
                  <div>
                    <h4>Date</h4>

                    <h2>{modalData.delivery_date}</h2>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  )
}
