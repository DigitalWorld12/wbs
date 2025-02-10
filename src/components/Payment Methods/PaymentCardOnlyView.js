import * as React from 'react'
import { useState } from 'react' // Import useState

import styles from '../../../styles/PaymentMethod.module.css'

export default function PaymentCardOnlyView() {
  // Define state variables for input values and disabled state
  const [accountTitle, setAccountTitle] = useState('Your Account Title')
  const [ibanNumber, setIbanNumber] = useState('Your IBAN Number')
  const [bankName, setBankName] = useState('Your Bank Name')
  const [country, setCountry] = useState('Your Country')
  const [description, setDescription] = useState('Your Description')

  // Define a state variable to track the edit mode
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    // Enable editing mode
    setIsEditing(true)
  }

  const handleSave = () => {
    // Disable editing mode and save the changes
    setIsEditing(false)
  }

  const handleClear = () => {
    // Clear all input fields and enable editing mode
    setAccountTitle('')
    setIbanNumber('')
    setBankName('')
    setCountry('')
    setDescription('')
    setIsEditing(true)
  }

  return (
    <div className={styles.sub_container}>
      <div className={styles.flex}>
        <div className={styles.flex_col}>
          <h3>Account Title</h3>
          <input
            className={styles.input}
            type="text"
            placeholder="Account Title"
            value={accountTitle}
            disabled={!isEditing}
            onChange={(e) => setAccountTitle(e.target.value)}
          />
        </div>
        <div className={styles.flex_col}>
          <h3>IBAN Number</h3>
          <input
            className={styles.input}
            type="text"
            placeholder="IBAN Number"
            value={ibanNumber}
            disabled={!isEditing}
            onChange={(e) => setIbanNumber(e.target.value)}
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
            value={bankName}
            disabled={!isEditing}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>
        <div className={styles.flex_col}>
          <h3>Country</h3>
          <input
            className={styles.input}
            type="text"
            placeholder="Country"
            value={country}
            disabled={!isEditing}
            onChange={(e) => setCountry(e.target.value)}
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
    </div>
  )
}
