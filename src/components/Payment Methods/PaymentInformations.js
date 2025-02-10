import * as React from 'react'
import { useRef } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import styles from '../../../styles/PaymentMethod.module.css'

import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import Link from 'next/link'
import { Api } from '../../config/Config'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'
import localStorage from 'local-storage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'
export default function Payment_Info({
  service_charges,
  orderData,
  platform_commission,
  commissions,
}) {
  const router = useRouter()
  const cardButtonRef = useRef(null)
  const [promo_Code, setPromo_Code] = React.useState('')
  const [coupon, setCoupon] = React.useState('')
  const [error, setError] = React.useState(null) // Define the error state
  const handleApplyPromoCode = () => {
    const promoData = {
      code: promo_Code,
      order_total: parseFloat(service_charges).toFixed(1),
    }
    axios
      .post(`${baseURL}/api/apply-coupon`, promoData, {
        headers: {
          Authorization:
            'Bearer ' +
            reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
        },
      })
      .then((response) => {
        if (response?.status === 200) {
          toast.success(response?.data?.message)
          setCoupon(response?.data)
        }
      })
      .catch((error) => {
        console.error('Error applying promo code', error)
        toast.error('Error applying promo code. Please try again.')
      })
  }
  const handleUnauthorized = () => {
    router.push('/login') // Redirect to the login page
  }
  const [paymobAttachment, setPamobAttachments] = React.useState({})
  React.useEffect(() => {
    if (orderData) {
      setPamobAttachments(JSON?.parse(orderData))
    }
  }, [orderData])

  const commissionPercentage = commissions ? commissions : ''
  const platformCommission = platform_commission || ''
  let platform = {}
  try {
    platform = JSON.parse(platformCommission)
  } catch (error) {
    console.error('Error parsing platform commission:', error)
  }
  const commission = (service_charges * commissionPercentage) / 100

  // Calculate the total amount including the commission
  const convertedServiceCharges = parseFloat(service_charges)
  const totalAmount =
    convertedServiceCharges +
    (platform && platform.amount ? parseFloat(platform.amount) : 0)

  const currentUser = localStorage.get('loginAuth')?.user
  const [paymentToken, setPaymentToken] = React.useState(null)

  const [selectedMethod, setSelectedMethod] = React.useState(false)
  const [card, setCard] = React.useState(false)
  const [jazzCash, setJazzCash] = React.useState(false)
  const [EasyPaisa, setEasyPaisa] = React.useState(false)

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  const handleCardClick = () => {
    if (!document.getElementById('c1').checked) {
      toast.error('Please agree to the terms & policies.')
    } else {
      setSelectedMethod(true)
      setCard(true)
      setEasyPaisa(false)
      setJazzCash(false)
    }
  }

  const handleEasyPaisaClick = () => {
    if (!document.getElementById('c1').checked) {
      toast.error('Please agree to the terms & policies.')
    } else {
      setSelectedMethod(true)
      setEasyPaisa(true)
      setJazzCash(false)
      setCard(false)
    }
  }

  const handleJazzCashClick = () => {
    if (!document.getElementById('c1').checked) {
      toast.error('Please agree to the terms & policies.')
    } else {
      setSelectedMethod(true)
      setJazzCash(true)
      setCard(false)
      setEasyPaisa(false)
    }
  }
  const handlePayment = () => {
    const requestData = {
      ...paymobAttachment,
      payment_method: selectedMethod ? 'card' : 'jazzCash', // Adjust the value based on the selected method
      coupon_id: coupon?.coupon?.id,
    }
    axios
      .post(
        // Api?.ADD_ORDER,
        `${baseURL}/api/order/add`,

        requestData,

        {
          headers: {
            Authorization:
              'Bearer ' +
              reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
          },
        },
      )

      .then(function (response) {
        const merchant_order_id = response.data.unique_id
        setPaymentToken(response.data.payment_token)
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          handleUnauthorized() // Redirect to login page if unauthorized
          setError(error)
        } else {
          console.error(error)
        }
      })
  }
  // Use this inside your component
  useEffect(() => {
    // Check for 401 response and redirect to login page
    if (error && error.response && error.response.status === 401) {
      handleUnauthorized()
    }
  }, [error])

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  useEffect(() => {
    if (orderData) {
      setPamobAttachments(JSON?.parse(orderData))
    }

    if (error && error.response && error.response.status === 401) {
      handleUnauthorized()
    }
    dispatch(fetchCurrency())

    if (paymentToken && card) {
      const cardButton = document.getElementById('card-button')
      if (cardButton) {
        cardButton.click()
      }
    }
  }, [paymentToken, card])

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

      <div className={styles.Main_Container_Setting}>
        <div>
          <h1 className={styles.Payment_Info_TopHeading}>Payment Info</h1>
        </div>

        <div className={styles.price_sec}>
          <div className={styles.Payment_Info_payment_Title}>
            <h3 className={styles.Video_Fee}>Video Fee</h3>
            <h3 className={styles.Amount_PKR}>
              {symbol ? symbol : ''}
              {service_charges
                ? parseInt(service_charges) >= 1000
                  ? parseInt(service_charges).toLocaleString()
                  : service_charges
                : '0'}
            </h3>
          </div>

          {platform && platform.label && platform?.amount && (
            <div className={styles.Payment_Info_payment_Title}>
              <h3 className={styles.Video_Fee}>{platform?.label}</h3>

              <h3 className={styles.Amount_PKR}>
                {symbol ? symbol : ''}

                {platform?.amount
                  ? parseInt(platform?.amount) >= 1000
                    ? parseInt(platform?.amount).toLocaleString()
                    : platform?.amount
                  : '0'}
              </h3>
            </div>
          )}
          {/* ------------------ */}
          {coupon && coupon?.coupon?.discount_amount && (
            <div className={styles.Payment_Info_payment_Title}>
              <h3 className={styles.Video_Fee}>Discount Amount</h3>

              <h3 className={styles.Amount_PKR}>
                {coupon?.coupon?.discount_type === 'percentage' ? (
                  <>{coupon?.coupon?.discount_amount} %</>
                ) : (
                  <>
                    {symbol ? symbol : ''}
                    {coupon?.coupon?.discount_amount
                      ? parseInt(coupon?.coupon?.discount_amount) >= 1000
                        ? parseInt(
                            coupon?.coupon?.discount_amount,
                          ).toLocaleString()
                        : coupon?.coupon?.discount_amount
                      : '0'}
                  </>
                )}
              </h3>
            </div>
          )}

          {/* -------------------- */}

          {/* --------------------------------------------- */}
          <div className={styles.Payment_Info_payment_Title}>
            <h3 className={styles.Video_Fee}>Total</h3>
            <h3 className={styles.Amount_PKR}>
              {coupon?.coupon?.discount_type === 'percentage' ? (
                <>
                  {coupon?.new_order_total
                    ? `${symbol ? symbol : ''} ${(
                        parseFloat(coupon?.new_order_total) +
                        parseFloat(platform?.amount)
                      ).toLocaleString()}`
                    : `${symbol ? symbol : ''} ${parseFloat(
                        totalAmount,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })} `}
                </>
              ) : (
                <>
                  {coupon?.new_order_total
                    ? `${symbol ? symbol : ''} ${parseFloat(
                        coupon?.new_order_total,
                      ).toLocaleString()}`
                    : `${symbol ? symbol : ''} ${parseFloat(
                        totalAmount,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })} `}
                </>
              )}
            </h3>
          </div>
          {/* ------------------------- */}
        </div>
        {!coupon && (
          <div className={styles.amount_promo_section}>
            <label>
              <input
                type={'text'}
                value={promo_Code}
                onChange={(event) => setPromo_Code(event.target.value)}
                placeholder="Promo Code"
              />
              <button onClick={handleApplyPromoCode}>Apply</button>
            </label>
          </div>
        )}
        <div className={styles.Payment_Info_checkbox}>
          <input type="checkbox" id="c1" />
          <label for="c1">
            By Booking, You agree to{' '}
            <Link href="/user_privacy_policy" target="_blank">
              {' '}
              terms & policies.
            </Link>
          </label>
        </div>

        <div className={styles.btn_flex}>
          {selectedMethod === false && (
            <>
              <button
                className={styles.btn_Book_Now_PAYMENT}
                variant="outlined"
                onClick={handleCardClick}
              >
                <Image
                  src={require('../../Asset/cash images/visa-icon.png')}
                  alt="Picture of the author"
                  className={styles.payment_card_cash_image}
                />
              </button>
              <button
                className={styles.btn_Book_Now_PAYMENT}
                variant="outlined"
                onClick={handleEasyPaisaClick}
              >
                <Image
                  src={require('../../Asset/cash images/easypaisa-icon.png')}
                  alt="Picture of the author"
                  className={styles.payment_card_cash_image}
                />
                {/* Pay Via Easy Paisa */}
              </button>
              <button
                className={styles.btn_Book_Now_PAYMENT}
                variant="outlined"
                onClick={handleJazzCashClick}
              >
                <Image
                  src={require('../../Asset/cash images/jazzcash-icon.png')}
                  alt="Picture of the author"
                  className={styles.payment_card_cash_image}
                />
                {/* Pay Via Jazz Cash */}
              </button>
            </>
          )}
        </div>
        <div className={styles.btn_flex2}>
          {selectedMethod === true && (
            <>
              {card && (
                <Image
                  src={require('../../Asset/cash images/visa-icon.png')}
                  alt="Card Image"
                  height={100}
                  className={styles.btn_Book_Now_PAYMENTFINAL}
                  variant="outlined"
                  onClick={handlePayment}
                />
              )}
              {jazzCash && (
                <Image
                  src={require('../../Asset/cash images/jazzcash-icon.png')}
                  alt="Jazz Cash Image"
                  height={100}
                  className={styles.btn_Book_Now_PAYMENTFINAL}
                  variant="outlined"
                  onClick={handlePayment}
                />
              )}
              {EasyPaisa && (
                <Image
                  src={require('../../Asset/cash images/easypaisa-icon.png')}
                  alt="EasyPaisa Image"
                  height={100}
                  className={styles.btn_Book_Now_PAYMENTFINAL}
                  variant="outlined"
                  onClick={handlePayment}
                />
              )}
              <Button
                className={styles.btn_Book_Now}
                variant="outlined"
                onClick={() => {
                  setSelectedMethod(false)
                }}
              >
                Change Payment Method
              </Button>
            </>
          )}

          {paymentToken && jazzCash ? (
            <>
              <a href={`https://pakistan.paymob.com/iframe/${paymentToken}`}>
                {/* Pay Via Jazzcash */}
              </a>
            </>
          ) : null}
          {paymentToken && EasyPaisa ? (
            <>
              <a href={`https://pakistan.paymob.com/iframe/${paymentToken}`}>
                {/* Pay Via EasyPaisa */}
              </a>
            </>
          ) : null}
          {paymentToken && card ? (
            <>
              <a
                id="card-button"
                href={`https://pakistan.paymob.com/api/acceptance/iframes/108012?payment_token=${paymentToken}`}
                onClick={() => {
                  window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/108012?payment_token=${paymentToken}`
                }}
              >
                {/* Pay Via Card */}
              </a>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
