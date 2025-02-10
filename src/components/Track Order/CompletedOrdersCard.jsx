import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from '../../../styles/OrderCard.module.css'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'
import { Api } from '../../config/Config'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'
export default function CompletedOrdersCard() {
  const [modalData, setModalData] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpenClose = () => setOpen(!open)
  const [orders, setOrders] = useState(null)
  const [ordersLoader, setOrdersLoader] = useState(false)
  const router = useRouter()

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const getOrders = () => {
    axios
      .get(
        // Api?.GET_ORDERS
        `${baseURL}/api/user/get-orders`,

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
    <div className={styles.parent_row}>
      {orders?.some((cardData) => cardData.status === 'completed') && (
        <h1>Completed Orders</h1>
      )}
      <div className={styles.row}>
        {ordersLoader ? (
          <>
            {orders?.map((cardData) => (
              <div key={cardData?.id}>
                <div
                  onClick={() => {
                    setModalData(cardData)
                    router.push({
                      pathname: '/artist_request_perview',
                      query: { cardData: JSON.stringify(cardData) }, // Convert cardData to a string
                    })
                  }}
                  className={styles.card}
                >
                  <div className={styles.card_sec}>
                    <h5>
                      {cardData.status.charAt(0).toUpperCase() +
                        cardData.status.slice(1)}
                    </h5>
                  </div>
                  <div className={styles.card_sec2}>
                    <h6 className={styles.order_card_h6}>Talent Name</h6>
                    <h3>{cardData.artist.nick_name}</h3>
                  </div>
                  <div className={styles.card_sec2}>
                    <h6 className={styles.order_card_h6}>Occasion</h6>
                    <h3>{cardData.occasion.name}</h3>
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
                </div>

                <Link
                  className={styles.link}
                  href={{
                    pathname: '/order_download',
                    query: {
                      order_id: cardData?.id,
                      order_video: cardData?.video,
                      to: cardData?.to,
                      from: cardData?.from,
                      occassion: cardData?.occasion?.name,
                      message: cardData?.message,
                      profile: cardData?.artist?.profile_image,
                      artist_id: cardData?.artist_id,
                    },
                  }}
                >
                  Proceed to View
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
                <h4>For</h4>
                <h2>{modalData.from}</h2>
              </div>

              <div>
                <h4>Name</h4>
                <h2>{modalData?.artist?.name}</h2>
              </div>

              <div>
                <h4>Occasion</h4>
                <h2>{modalData?.occasion?.name}</h2>
              </div>

              <div className={styles.card_sec1}>
                <div>
                  <h4>Tracking Id</h4>

                  <h2>{modalData.id}</h2>
                </div>

                <div>
                  <h4>Order No</h4>

                  <h2>{modalData.unique_id}</h2>
                </div>
                <div>
                  <h4>Price</h4>

                  <h2>{modalData.service_earning}</h2>
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
  )
}
