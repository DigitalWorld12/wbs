import Head from 'next/head'
import styles from '../styles/ArtistsSignup.module.css'
import React from 'react'
import Image from 'next/image'
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import EditProfile from '../src/components/editProfileCard/EditProfileCard'
import EditProfileCard from '../src/components/editProfileCard/EditProfileCard'

function artist_signup() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.artists_signup_width}></div>

        <div className={styles.artists_signup_height}></div>

        <h1 className={styles.artists_signup_heading_h1}>
          ENROLL WBS AS TALENT
        </h1>

        <EditProfileCard />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  )
}
export default artist_signup
