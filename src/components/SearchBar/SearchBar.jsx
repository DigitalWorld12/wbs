import React, { useState } from 'react'
import styles from '../../../styles/SearchBar.module.css'
import CancelIcon from '@mui/icons-material/Cancel'

export default function SearchBar(props) {
  const { isNavBarOpen, setIsNavBarOpen } = props

  return (
    <>
      <form action="">
        <div
          className={`${styles.container} ${
            isNavBarOpen ? styles.open : styles.closed
          }`}
        >
          <input
            type="search"
            name="email"
            placeholder="Search Artist Name"
            className={styles.input}
          />
          <input
            type="number"
            placeholder="PKR: 1000"
            className={styles.input_price}
          />
          <input
            type="number"
            placeholder="PKR: 25000"
            className={styles.input_price}
          />
          <button type="submit" className={styles.btn}>
            Search
          </button>
          <div
            className={styles.closeButton}
            onClick={() => setIsNavBarOpen(false)}
          >
            <CancelIcon />
          </div>
        </div>
      </form>
    </>
  )
}
