import Head from 'next/head'
import styles from '../../../styles/BusinessThankYouBox.module.css'

import React from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { width } from '@mui/system'
function BusinessThankYouBox(isPayment) {
  const rootRef = React.useRef(null)
  return (
    <Box
      className={styles.BusinessThankBox}
      sx={{
        height: 440,
        flexGrow: 1,
        minWidth: 500,
        transform: 'translateZ(0)',
        backgroundColor: '#1B1B1B',
        borderRadius: 2,
        '@media all and (-ms-high-contrast: none)': {
          display: 'none',
        },
      }}
      ref={rootRef}
    >
      <Box
        sx={{
          height: 380,
          position: 'relative',
          width: 650,
          border: '2px solid #CEA234',
          borderRadius: 2,
          boxShadow: (theme) => theme.shadows[5],
          p: 4,
        }}
        className={styles.BusinessThankBoxFlex}
      >
        <h1>Thank You For Your Contribution</h1>
        <p>
          Your submission has been received.<br></br>
          Our team will get back in touch with you soon.
        </p>
        <button className={styles.BusinessThankBoxButton}>
          Talk to an expert
        </button>
      </Box>
    </Box>
  )
}
export default BusinessThankYouBox
