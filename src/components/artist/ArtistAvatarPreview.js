import Head from 'next/head'
// import styles from "../styles/ArtistRequest.module.css";
import styles from '../../../styles/ArtistRequest.module.css'
import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Image from 'next/image'
import Link from 'next/link'
function ArtistAvatarPreview({ talent_id, service_id, service_charges }) {
  return (
    <div className={styles.artist_avatar_main}>
      <Link href={''}>
        <div className={styles.artist_avatar_flex}>
          <Avatar alt="Remy Sharp" variant="square">
            <Image
              src={
                require('../../Asset/Images/Woman_and_man.jpg') || placeholder
              }
              alt=""
            />
          </Avatar>
          <span className={styles.Profile_Someone}>For Someone</span>
        </div>
      </Link>

      <Link href={''}>
        <div>
          <Avatar alt="Remy Sharp" variant="square">
            <Image
              src={require('../../Asset/Images/ForMyself.png') || placeholder}
              alt=""
            />
          </Avatar>
          <span className={styles.Profile_Someone}>For Myself</span>
        </div>
      </Link>
    </div>
  )
}
export default ArtistAvatarPreview
