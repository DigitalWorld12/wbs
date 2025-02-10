import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import styles from '../../../styles/TalentEarning.module.css'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Talent_Order_Table from './talent_total_order_table'
export default function Talent_Total_Order() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }
  return (
    <div className={styles.container}>
      {/* Session Heading for TalentDashboard */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2 className={styles.Talent_Dashboard_TopHeading}>
              Talent Earning
            </h2>
          </Grid>
        </Grid>
      </Box>

      {/* Session Orders  */}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Image
              className={styles.TalentDashboard_Images}
              src={require('../../Asset/Images/Totalorder.png')}
              alt="Picture of the Totalorder"
            />
            <h3 className={styles.Order_Heading}>Total order Received</h3>
          </Grid>
          <Grid item xs={3}>
            <Image
              className={styles.TalentDashboard_Images}
              src={require('../../Asset/Images/TotalorderDelivered.png')}
              alt="Picture of the TotalorderDelivered"
            />
            <h3 className={styles.Order_Heading}>
              Last
              <br /> Transaction
            </h3>
          </Grid>
          <Grid item xs={3}>
            <Image
              className={styles.TalentDashboard_Images}
              src={require('../../Asset/Images/OverallEarnings.png')}
              alt="Picture of the OverallEarnings"
            />
            <h3 className={styles.Order_Heading}>
              Overall
              <br />
              Earnings
            </h3>
          </Grid>
          <Grid item xs={3}>
            <Image
              className={styles.TalentDashboard_Images}
              src={require('../../Asset/Images/OverallRatings.png')}
              alt="Picture of the OverallRatings"
            />
            <h3 className={styles.Order_Heading}>
              Payment in <br />
              your account
            </h3>
          </Grid>
        </Grid>
      </Box>

      {/* Button */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button className={styles.btn_Total_Order} variant="outlined">
              Total Order
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
      {/* Table Section */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={styles.Table_Alignment_setting}>
            <Talent_Order_Table />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
