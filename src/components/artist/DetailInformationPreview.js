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
function DetailInformationPreview({ setMessage, orderData, service_charges }) {
  const router = useRouter()
  const onContinue = (event) => {}
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
          value={orderData?.message}
          aria-label="empty textarea"
          placeholder="Special intruction for artist goes here..."
          required
        />
        <div className={styles.amount_promo_section}>
          <h3 className={styles.details_want_tips}>
            Amount &nbsp; {symbol ? symbol : ''}
            {orderData?.service_charges
              ? parseInt(orderData?.service_charges) >= 1000
                ? parseInt(orderData?.service_charges).toLocaleString()
                : orderData?.service_charges
              : '0'}
          </h3>
          <label>
            <input
              type="text"
              value={orderData?.promo_code}
              placeholder="Promo Code"
            />
            <button>Apply</button>
          </label>
        </div>
      </div>
      <Link href="/track_my_order">
        <Button
          className={styles.btn_details_continue}
          variant="outlined"
          onClick={onContinue}
        >
          Back
        </Button>
      </Link>
    </>
  )
}
export default DetailInformationPreview
