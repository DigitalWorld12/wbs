import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import styles from '../../../styles/PaymentMethod.module.css'

import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import PaymentCardView from './PaymentCardView'
import PaymentCardOnlyView from './PaymentCardOnlyView'
import Link from 'next/link'
export default function Payment_Transfer() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  return (
    <div className={styles.sub_container}>
      <Grid item xs={12}>
        <h1 className={styles.Payment_Info_TopHeading}>Talent Bank Transfer</h1>
      </Grid>
      <Grid item xs={3}></Grid>

      <PaymentCardOnlyView />

      <div className={styles.flex_center_col}>
        <button className={styles.btn_Book_Now}>Proceed</button>
        <Link href="/artist_payment_card_view" className={styles.btn_Book_Now}>
          Change Account Detail
        </Link>
      </div>
    </div>
  )
}
