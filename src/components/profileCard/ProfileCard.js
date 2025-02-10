import Head from 'next/head'
import styles from '../../../styles/ProfileCard.module.css'
import React from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { height } from '@mui/system'
function ProfileCard(imgUrl) {
  return (
    <div className={styles.profile_card_width}>
      <div className={styles.profile_card_display_flex_driection}>
        <div className={styles.profile_card_width_82_height_112}>
          <Image
            src={require('../../Asset/Images/user_profile/user1.png')}
            alt="Picture of the author"
          />
        </div>
        <div className={styles.profile_card_width_91_height_margin_20}>
          <p className={styles.profile_card_paragraph_size}>
            For Myself
            <br />
            08-09-22
          </p>
        </div>

        <div
          className={styles.profile_card_width_91_height_margin_20_marginleft}
        >
          <p className={styles.profile_card_paragraph_size}>Track Order</p>
        </div>
      </div>
    </div>
  )
}
export default ProfileCard
