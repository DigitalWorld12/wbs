import styles from '../../../styles/ArtistRequest.module.css'
import React, { useEffect } from 'react'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'

function DetailInformation({
  setMessage,
  setPromo_Code,
  orderData,
  service_charges,
  platform_commission,
  commission,
}) {
  const router = useRouter()

  const onContinue = (event) => {
    const emptyFields = []

    if (!orderData.to) emptyFields.push('To')
    if (!orderData.from) emptyFields.push('From')
    if (!orderData.message) emptyFields.push('Message')
    if (!orderData.delivery_date) emptyFields.push('Delivery Date')
    if (!orderData.pronoun_to) emptyFields.push('Pronoun To')

    if (emptyFields.length > 0) {
      toast.error(
        `Please fill in the following fields: ${emptyFields.join(', ')}`,
        {
          autoClose: 3000,
        },
      )
      event.preventDefault()
    } else {
      const serializedObject = JSON.stringify(orderData)

      router.push({
        pathname: '/payment_info',
        query: {
          service_charges: service_charges,
          orderData: serializedObject,
          commission: commission,
          platform_commission: platform_commission,
        },
      })
    }
  }
  // Currency
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

      <div>
        <p className={styles.detail_information}>Detail Information</p>
      </div>

      <h2 className={styles.detail_Instruction_Artist}>
        Instruction For Artist
      </h2>
      <div>
        <TextareaAutosize
          className={styles.details_textarea}
          onChange={(event) => setMessage(event.target.value)}
          aria-label="empty textarea"
          placeholder="Special intruction for artist goes here..."
          required
        />
        <div className={styles.amount_promo_section}>
          <h3 className={styles.details_want_tips}>
            Amount &nbsp; {symbol ? symbol : ''}
            {service_charges
              ? parseInt(service_charges) >= 1000
                ? parseInt(service_charges).toLocaleString()
                : service_charges
              : '0'}
          </h3>
        </div>
      </div>

      <Button
        className={styles.btn_details_continue}
        variant="outlined"
        onClick={onContinue}
      >
        Continue
      </Button>
    </>
  )
}
export default DetailInformation
