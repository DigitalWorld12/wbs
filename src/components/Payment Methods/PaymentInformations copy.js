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
export default function Payment_Info({ service_charges, orderData }) {
  const router = useRouter()
  const cardButtonRef = useRef(null)
  const [error, setError] = React.useState(null) // Define the error state

  const handleUnauthorized = () => {
    router.push('/login') // Redirect to the login page
  }
  const [paymobAttachment, setPamobAttachments] = React.useState({})

  React.useEffect(() => {
    if (orderData) {
      setPamobAttachments(JSON?.parse(orderData))
    }
  }, [orderData])

  // Calculate the commission (2.5% of service_charges)
  const commissionPercentage = 2.5
  const commission = (service_charges * commissionPercentage) / 100

  // Calculate the total amount including the commission
  const convertedServiceCharges = parseFloat(service_charges)
  const totalAmount = convertedServiceCharges + commission

  // const paymobAttachment = JSON?.parse(orderData);
  // const currentUser = reactLocalStorage.getObject("loginAuth")?.user
  const currentUser = localStorage.get('loginAuth')?.user
  const [paymentToken, setPaymentToken] = React.useState(null)
  // console.log(paymobAttachment);

  const paymentOrderrderData = {
    name: paymobAttachment?.to,
    amount_cents: totalAmount * 100,
    description: paymobAttachment?.message,
    quantity: '1',
  }
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
    axios
      .post(
        // Api?.ADD_ORDER,
        `${baseURL}/api/order/add`,

        paymobAttachment,
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

        axios
          .post('https://pakistan.paymob.com/api/auth/tokens', {
            api_key:
              'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T0RJeE9URXNJbTVoYldVaU9pSXhOamc0TXpreU1qazJMak00TXpVNEluMC5kcUJYQnJKLU14UUpZaEU2QzNwa2Y5SEdtbXRyNlBUcl9zZzB1eWNzMy1MYU9VRFdJRERVVlVob2ZWS05xa3huNE5iUE1HWGJoRmhhcFRWX25FaHpKUQ==',
          })
          .then(function (response) {
            const TOKEN = response.data.token

            axios
              .post('https://pakistan.paymob.com/api/ecommerce/orders', {
                auth_token: response.data.token,
                delivery_needed: true,
                amount_cents: totalAmount * 100,
                currency: 'PKR',
                merchant_order_id: merchant_order_id,
                items: [paymentOrderrderData],
                shipping_data: {},
                shipping_details: {},
              })
              .then(function (response) {
                axios
                  .post(
                    'https://pakistan.paymob.com/api/acceptance/payment_keys',
                    {
                      auth_token: TOKEN,
                      amount_cents: totalAmount * 100,
                      expiration: 3600,
                      order_id: response.data.id,
                      billing_data: {
                        email: currentUser.email,
                        first_name: currentUser.name,
                        street: 'NA',
                        building: 'NA',
                        phone_number: '09786756564',
                        shipping_method: 'NA',
                        postal_code: 'NA',
                        city: 'NA',
                        country: 'NA',
                        last_name: currentUser.name,
                        state: 'NA',
                        floor: 'NA',
                        apartment: 'NA',
                      },
                      currency: 'PKR',
                      integration_id: card
                        ? '86016'
                        : jazzCash
                        ? '86563'
                        : '86562',
                      lock_order_when_paid: false,
                    },
                  )
                  .then(function (response) {
                    setPaymentToken(response.data.token)
                  })
                  .catch(function (error) {
                    if (error.response && error.response.status === 401) {
                      handleUnauthorized() // Redirect to login page if unauthorized
                      setError(error)
                    } else {
                      console.error(error)
                    }
                  })
              })
              .catch(function (error) {
                if (error.response && error.response.status === 401) {
                  handleUnauthorized() // Redirect to login page if unauthorized
                  setError(error)
                } else {
                  console.error(error)
                }
              })
          })
          .catch(function (error) {
            if (error.response && error.response.status === 401) {
              handleUnauthorized() // Redirect to login page if unauthorized
              setError(error)
            } else {
              console.error(error)
            }
          })
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
    if (paymentToken && card) {
      const cardButton = document.getElementById('card-button')
      if (cardButton) {
        cardButton.click()
      }
    }
  }, [paymentToken, card])
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
            <h3 className={styles.Amount_PKR}> PKR {service_charges}</h3>
          </div>
          <div className={styles.Payment_Info_payment_Title}>
            <h3 className={styles.Video_Fee}>Service Fee</h3>
            <h3 className={styles.Amount_PKR}>
              PKR {parseFloat(commissionPercentage).toFixed(2)}%
            </h3>
          </div>
          <div className={styles.Payment_Info_payment_Title}>
            <h3 className={styles.Video_Fee}>Total</h3>
            <h3 className={styles.Amount_PKR}>
              {' '}
              {/* PKR {Number(service_charges) + 2000} */}
              PKR {parseFloat(totalAmount).toFixed(1)}
            </h3>
          </div>
        </div>
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
                {/* Pay Via Card */}
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
              <Button
                className={styles.btn_Book_Now}
                variant="outlined"
                onClick={handlePayment}
              >
                Book Now
              </Button>

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
              <a
                href={`https://pakistan.paymob.com/iframe/${paymentToken}`}
                className={styles.btn_Book_Now}
                variant="outlined"
              >
                Pay Via Jazzcash
              </a>
            </>
          ) : null}
          {paymentToken && EasyPaisa ? (
            <>
              <a
                href={`https://pakistan.paymob.com/iframe/${paymentToken}`}
                className={styles.btn_Book_Now}
                variant="outlined"
              >
                Pay Via EasyPaisa
              </a>
            </>
          ) : null}
          {paymentToken && card ? (
            <>
              <a
                id="card-button"
                href={`https://pakistan.paymob.com/api/acceptance/iframes/108012?payment_token=${paymentToken}`}
                className={styles.btn_Book_Now}
                variant="outlined"
                onClick={() => {
                  window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/108012?payment_token=${paymentToken}`
                }}
              >
                Pay Via Card
              </a>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
