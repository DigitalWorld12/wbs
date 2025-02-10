// import * as React from "react";
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
import { useEffect, useState } from 'react'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Payment_Card = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const [errors, setErrors] = useState({})
  const [countries, setCountries] = useState([])
  const fetchCountries = async () => {
    try {
      const response = await axios.get(` ${baseURL}/api/all-countries`)
      const countries = response.data.data.map((country) => ({
        id: country.id,
        name: country.name,
      }))

      setCountries(countries)
    } catch (error) {
      console.error('Error fetching countries:', error)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  let artistId
  if (typeof window !== 'undefined') {
    const artistdata = reactLocalStorage.getObject('isArtist')
    artistId = artistdata?.data?.id
  } else {
    artistId = null
  }

  const [formData, setFormData] = useState({
    artist_id: artistId,
    account_title: '',
    account_number: '',
    bank_name: '',
    country_id: '',
    currency: '',
    ibn: '',
  })
  const IBAN_PATTERN = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/
  const ACCOUNT_NUMBER_MIN_DIGITS = 8
  const ACCOUNT_NUMBER_MAX_DIGITS = 17
  const IBAN_MIN_LENGTH = 15
  const IBAN_MAX_LENGTH = 34
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleBlur = (e) => {
    if (e.target.name === 'ibn') {
      if (!e.target.value) {
        notify('IBAN is required')
      } else if (
        e.target.value.length < IBAN_MIN_LENGTH ||
        e.target.value.length > IBAN_MAX_LENGTH
      ) {
        notify(
          `IBAN should be between ${IBAN_MIN_LENGTH} and ${IBAN_MAX_LENGTH} characters.`,
        )
      } else if (!IBAN_PATTERN.test(e.target.value)) {
        notify('Invalid IBAN format. Please use the correct pattern.')
      }
    } else if (e.target.name === 'account_number') {
      if (
        e.target.value.length < ACCOUNT_NUMBER_MIN_DIGITS ||
        e.target.value.length > ACCOUNT_NUMBER_MAX_DIGITS
      ) {
        notify(
          `Account number should be between ${ACCOUNT_NUMBER_MIN_DIGITS} and ${ACCOUNT_NUMBER_MAX_DIGITS} digits.`,
        )
      }
    }
  }
  const notify = (message) => toast.error(message)

  const validateForm = () => {
    let valid = true
    const newErrors = {}

    if (!formData.account_title) {
      newErrors.account_title = 'Account title is required'
      valid = false
      notify('Account title is required')
    }

    if (!formData.account_number) {
      newErrors.account_number = 'Account number is required'
      valid = false
      notify('Account number is required')
    }

    if (!formData.bank_name) {
      newErrors.bank_name = 'Bank name is required'
      valid = false
      notify('Bank name is required')
    }

    if (!formData.country_id) {
      newErrors.country_id = 'Country is required'
      valid = false
    }

    if (!formData.currency) {
      newErrors.currency = 'Currency is required'
      valid = false
      notify('Currency is required')
    }

    if (!formData.ibn) {
      newErrors.ibn = 'IBAN is required'
      valid = false
      notify('IBAN is required')
    } else if (!IBAN_PATTERN.test(formData.ibn)) {
      newErrors.ibn = 'Invalid IBAN format. Please use the correct pattern.'
      valid = false
      notify('Invalid IBAN format. Please use the correct pattern.')
    }

    setErrors(newErrors)
    return valid
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${baseURL}/api/artist/add-bank`,
          formData,
          {
            headers: {
              Authorization:
                'Bearer' +
                reactLocalStorage.getObject('loginAuth')?.authorisation?.token,
            },
          },
        )

        if (response.data.status) {
          toast.success(response.data.message)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }
  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  return (
    <>
      <ToastContainer className="tost" />
      <form className={styles.sub_container} onSubmit={handleFormSubmit}>
        <h1 className={styles.Payment_Info_TopHeading}>
          Enter Your Bank Details
        </h1>

        <div className={styles.flex}>
          <input
            className={styles.input}
            type="text"
            placeholder="Account Title"
            name="account_title"
            onChange={handleInputChange}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Account Number"
            name="account_number"
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="IBAN Number"
            name="ibn"
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
        <div className={styles.flex}>
          <input
            className={styles.input}
            type="text"
            placeholder="Bank Name"
            name="bank_name"
            onChange={handleInputChange}
          />
          <select
            className={styles.input}
            name="country_id"
            onChange={handleInputChange}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <input
            className={styles.input}
            type="text"
            placeholder="Currency"
            name="currency"
            onChange={handleInputChange}
          />
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
        ></textarea>

        <button type="submit" className={styles.btn_Book_Now}>
          Save
        </button>
      </form>
    </>
  )
}

export default Payment_Card
