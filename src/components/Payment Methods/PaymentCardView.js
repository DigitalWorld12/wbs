import * as React from 'react'
import { useState } from 'react' // Import useState
import { useEffect } from 'react'
// import styles from "../../../s/tyles/PaymentMethod.module.css";
import axios from 'axios' // Import Axios

import styles from '../../../styles/PaymentMethod.module.css'
import localStorage from 'local-storage'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { reactLocalStorage } from 'reactjs-localstorage'

export default function PaymentCardView() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter()
  // Define state variables for input values and disabled state
  const [accountTitle, setAccountTitle] = useState('')
  const [ibanNumber, setIbanNumber] = useState('')
  const [bankName, setBankName] = useState('')
  const [country, setCountry] = useState('')
  const [country_id, setCountry_id] = useState('')
  const [currency, setCurrency] = useState('')
  const [account_number, setAccount_Number] = useState('')

  const [description, setDescription] = useState('')
  const [banks, setBanks] = useState([])

  // Make GET request using Axios

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistdata = reactLocalStorage.getObject('isArtist')
        const artistId = artistdata?.data?.id
        const response = await axios.get(
          ` ${baseURL}/api/artist/all-banks?artist_id=${artistId}`,
          {
            headers: {
              Authorization:
                'Bearer ' + localStorage.get('loginAuth')?.authorisation?.token,
            },
          },
        )

        setBanks(response.data.data)
        // Process the received data as needed
      } catch (error) {
        console.error('Error:', error)
        // Handle errors as needed
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (banks.length > 0) {
      const initialBank = banks[0] // Assuming you want to set the first bank's data

      setAccountTitle(initialBank.account_title)
      setIbanNumber(initialBank.ibn)
      setBankName(initialBank.bank_name)
      setCountry(initialBank.country ? initialBank.country.name : '')
      setCountry_id(initialBank.country_id)
      setAccount_Number(
        initialBank.account_number ? initialBank.account_number : '',
      )
      setCurrency(initialBank.currency)
      setDescription('') // Set description as needed from the API
    }
  }, [banks])
  // Define a state variable to track the edit mode
  const [isEditing, setIsEditing] = useState(false)
  const [currentEditingIndex, setCurrentEditingIndex] = useState(null)

  const handleEdit = (index) => {
    const newBanks = banks.map((bank, i) => {
      if (i === index) {
        return {
          ...bank,
          isEditing: true,
          // setIsEditing(true);
        }
      }
      return bank
    })

    setBanks(newBanks)

    setCurrentEditingIndex(index)
  }

  const IBAN_PATTERN = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/
  const ACCOUNT_NUMBER_MIN_DIGITS = 8
  const ACCOUNT_NUMBER_MAX_DIGITS = 17
  const IBAN_MIN_LENGTH = 15
  const IBAN_MAX_LENGTH = 34

  const handleSave = async (index) => {
    const updatedBank = banks[index]
    const newBanks = banks.map((bank, i) =>
      i === index ? { ...updatedBank, isEditing: false } : bank,
    )

    setBanks(newBanks)

    // Disable editing mode and save the changes
    setIsEditing(false)

    // Array to store the names of empty fields
    const emptyFields = []

    // Check for empty fields and add their names to the array
    if (accountTitle === '') emptyFields.push('Account Title')
    if (ibanNumber === '') emptyFields.push('IBAN Number')
    if (bankName === '') emptyFields.push('Bank Name')
    if (country === '') emptyFields.push('Country')
    if (country_id === '') emptyFields.push('Country ID')
    if (account_number === '') emptyFields.push('Account Number')
    if (currency === '') emptyFields.push('Currency')
    // Check IBAN format and length
    if (
      ibanNumber !== '' &&
      (!IBAN_PATTERN.test(ibanNumber) ||
        ibanNumber.length < IBAN_MIN_LENGTH ||
        ibanNumber.length > IBAN_MAX_LENGTH)
    ) {
      toast.error('Please enter a valid IBAN number')
      return
    }

    // Check Account Number length
    if (
      account_number !== '' &&
      (account_number.length < ACCOUNT_NUMBER_MIN_DIGITS ||
        account_number.length > ACCOUNT_NUMBER_MAX_DIGITS)
    ) {
      toast.error(
        `Please enter an account number between ${ACCOUNT_NUMBER_MIN_DIGITS} and ${ACCOUNT_NUMBER_MAX_DIGITS} digits`,
      )
      return
    }

    if (emptyFields.length > 0) {
      // Display a toast message for empty fields
      toast.error(
        `Please fill in the following fields: ${emptyFields.join(', ')}`,
      )
      return
    }

    try {
      const artistdata = reactLocalStorage.getObject('isArtist')
      const artistId = artistdata?.data?.id

      const response = await axios.post(
        `${baseURL}/api/artist/bank/update/${banks[index].id}`,
        {
          artist_id: artistId,
          account_title: banks[index].account_title,
          ibn: banks[index].ibn,
          bank_name: banks[index].bank_name,
          country: banks[index].country,
          country_id: banks[index].country_id,
          description: description,
          account_number: banks[index].account_number,
          currency: banks[index].currency,
        },
        {
          headers: {
            Authorization:
              'Bearer ' + localStorage.get('loginAuth')?.authorisation?.token,
          },
        },
      )

      if (
        response.data.status &&
        response.data.message === 'Artist Bank Details Added Successfully'
      ) {
        toast.success('Artist Bank Details Updated Successfully')
      }
      window.location.reload()
    } catch (error) {
      console.error('Save Error:', error)
    }
  }

  const handleClear = (index) => {
    const newBanks = banks.map((bank, i) =>
      i === index ? { ...bank, isEditing: false } : bank,
    )
    setAccountTitle('')
    setAccount_Number('')

    setIbanNumber('')
    setBankName('')
    setCountry('')
    setCountry_id('')
    setCurrency('')
    setDescription('')
    setIsEditing(true)
    setCurrentEditingIndex(null) // Reset current editing index
  }

  // Fetch the list of countries from an API
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://dev7.sidat.digital/wbs/api/all-countries',
          {
            headers: {
              Authorization:
                'Bearer ' + localStorage.get('loginAuth')?.authorisation?.token,
            },
          },
        )
        setCountries(response.data.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchCountries()
  }, [])
  const handleInputChange = (e, index, field) => {
    const newBanks = [...banks]
    newBanks[index][field] = e.target.value
    setBanks(newBanks)
  }
  return (
    <div className={styles.sub_container}>
      <ToastContainer className="tost" />

      {banks.map((bank, index) => (
        <>
          <h1 className={styles.Payment_Info_TopHeading} key={index}>
            {/* View Your  */}
            Bank {bank?.bank_name} Details
          </h1>

          <div className={styles.flex}>
            <div className={styles.flex_col}>
              <h3>Account Title</h3>
              <input
                className={styles.input}
                type="text"
                placeholder="Account Title"
                value={bank.account_title}
                disabled={!bank.isEditing}
                onChange={(e) => handleInputChange(e, index, 'account_title')}
              />
            </div>
            <div className={styles.flex_col}>
              <h3>Account Number</h3>
              <input
                className={styles.input}
                type="text"
                placeholder="Account Number"
                value={bank.account_number}
                disabled={!bank.isEditing}
                onChange={(e) => handleInputChange(e, index, 'account_number')}
              />
            </div>
            <div className={styles.flex_col}>
              <h3>IBAN Number</h3>
              <input
                className={styles.input}
                type="text"
                placeholder="IBAN Number"
                value={bank.ibn}
                disabled={!bank.isEditing}
                onChange={(e) => handleInputChange(e, index, 'ibn')}
              />
            </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.flex_col}>
              <h3>Bank Name</h3>
              <input
                className={styles.input}
                type="text"
                placeholder="Bank Name"
                value={bank.bank_name}
                disabled={!bank.isEditing}
                onChange={(e) => handleInputChange(e, index, 'bank_name')}
              />
            </div>
            <div className={styles.flex_col}>
              <h3>Country</h3>
              {bank.isEditing ? (
                <select
                  className={styles.input}
                  value={bank.country_id}
                  onChange={(e) => handleInputChange(e, index, 'country_id')}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Country"
                  value={bank.country?.name}
                  disabled={!bank.isEditing}
                  onChange={(e) => handleInputChange(e, index, 'country')}
                />
              )}
            </div>
            <div className={styles.flex_col}>
              <h3>Currency</h3>
              <input
                className={styles.input}
                type="text"
                placeholder="Currency"
                value={bank.currency}
                disabled={!bank.isEditing}
                onChange={(e) => handleInputChange(e, index, 'currency')}
              />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.flex_col2}>
              <h3>Description</h3>
              <textarea
                className={styles.textarea}
                placeholder="Description"
                value={description}
                disabled={!isEditing}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            {bank.isEditing ? (
              <button
                className={styles.btn_Book_Now}
                onClick={() => handleSave(index)}
              >
                Save
              </button>
            ) : (
              <button
                className={styles.btn_Book_Now}
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
            )}
          </div>
        </>
      ))}
    </div>
  )
}
