import Head from 'next/head'
// import styles from "../styles/ArtistRequest.module.css";
import styles from '../../../styles/ArtistRequest.module.css'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Image from 'next/image'
import Link from 'next/link'
import localStorage from 'local-storage'

function ArtistAvatar({
  talent_id,
  service_id,
  service_charges,
  platform_commission,
  commission,
}) {
  const router = useRouter()
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const userProfile = localStorage.get('loginAuth')?.user?.user_image
  const determineActiveLink = () => {
    if (router.pathname === '/artist_request') {
      return 'for_some_one'
    } else if (router.pathname === '/artist_request_to_person') {
      return 'to_person'
    } else {
      return 'to_person'
    }
  }

  const [activeLink, setActiveLink] = useState(determineActiveLink())

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId)
  }

  return (
    <div className={styles.artist_avatar_main}>
      <Link
        href={{
          pathname: '/artist_request',
          query: {
            talent_id: talent_id,
            service_id: service_id,
            service_charges: service_charges,
            commission: commission,
            platform_commission: platform_commission,
          },
        }}
        className={`${styles.for_some_one} ${
          activeLink === 'for_some_one'
            ? styles.activelink
            : styles.inactiveLink
        }`}
        onClick={() => handleLinkClick('for_some_one')}
      >
        <div className={styles.for_some_one}>
          <Avatar
            alt="Remy Sharp"
            variant="square"
            className={styles.Static_Image}
          >
            <Image
              className={styles.Image_Size}
              src={
                require('../../Asset/Images/Woman_and_man.jpg') || placeholder
              }
              alt=""
              width={1000}
              height={1000}
            />
          </Avatar>
          <span className={styles.Profile_Someone}>For Someone</span>
        </div>
      </Link>

      <Link
        href={{
          pathname: '/artist_request_to_person',
          query: {
            talent_id: talent_id,
            service_id: service_id,
            service_charges: service_charges,
            platform_commission: platform_commission,
            commission: commission,
          },
        }}
        className={`${styles.to_person} ${
          activeLink === 'to_person' ? styles.activelink : styles.inactiveLink
        }`}
        onClick={() => handleLinkClick('to_person')}
      >
        <div className={styles.to_person}>
          <Avatar
            alt="Remy Sharp"
            variant="square"
            className={styles.Static_Image}
          >
            <Image
              className={styles.Image_Size}
              src={
                userProfile
                  ? `${baseURL}/${userProfile}`
                  : require('../../Asset/Images/avatar.png')
              }
              width={1000}
              height={1000}
              alt=""
            />
          </Avatar>
          <span className={styles.Profile_Someone}>For Myself </span>
        </div>
      </Link>
    </div>
  )
}
export default ArtistAvatar
