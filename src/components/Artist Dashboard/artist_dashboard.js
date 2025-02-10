// import * as React from "react";
import React, { useState, useEffect } from 'react'
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import styles from '../../../styles/TalentDashboard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import RecievedOrderCard from './RecievedOrderCard'
import ReviewedOrderCard from './ReviewedOrderCard'
import RetakeOrderCard from './RetakeOrderCard'
import CompletedOrderCard from './CompletedOrderCard'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

import { reactLocalStorage } from 'reactjs-localstorage'

export default function ArtistDashboard() {
  const [activeLink, setActiveLink] = useState(null)

  const handleClick = (linkId) => {
    setActiveLink(linkId)
  }

  const [number, setNumber] = useState()
  const [progressValue, setProgressValue] = useState(0)
  const [artistEarnings, setArtistEarnings] = useState('')
  const [artistEarningsLoader, setArtistEarningsLoader] = useState(false)

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  useEffect(() => {
    const data = reactLocalStorage.getObject('isArtist')

    const avgRating =
      data?.data?.avg_ratting?.length > 0
        ? data?.data?.avg_ratting[0]?.avg_rating.toFixed(1)
        : '3.0'
    setNumber(avgRating)
  }, [])
  useEffect(() => {
    const calculatedProgressValue = (number / 5) * 100
    setProgressValue(calculatedProgressValue)
  }, [number])
  const GetDashboard = async () => {
    try {
      if (typeof window !== 'undefined') {
        const artistdata = reactLocalStorage.getObject('isArtist')
        const artistId = artistdata?.data?.id
        const userData = reactLocalStorage.getObject('loginAuth')
        const token = userData?.authorisation?.token

        await axios
          .get(
            `${baseURL}/api/artist/dashboard?artist_id=${artistId}`,

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((response) => {
            setArtistEarnings(response.data.data)
            setArtistEarningsLoader(true)
          })
          .catch((error) => {
            toast.error(error)
          })
      } else {
        console.error(
          'localStorage is not available in the server-side context.',
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getArtistData = async () => {
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId =
      artistdata?.data?.id !== undefined ? artistdata?.data?.id : null
    const userId = data?.user?.id

    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?user_id=${userId}&artist_id=${artistId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        reactLocalStorage.setObject('isArtist', response?.data)
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized')
          reactLocalStorage?.remove('loginAuth')
          router.push('/login')
        } else {
          console.error('Error: ', error)
        }
      })
  }
  useEffect(() => {
    GetDashboard()
    getArtistData()
  }, [])
  return (
    <div className={styles.container}>
      {/* Session Heading for TalentDashboard */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1 className={styles.talentdashboardtopHeading}>
              Talent Dashboard
            </h1>
          </Grid>
        </Grid>
      </Box>

      {/* Session Orders  */}

      {/* <Box sx={{ flexGrow: 1, width: "80%" }}> */}
      <div className={styles.artist_dashboard_width_100_flex}>
        <Link
          href="#recevied_order"
          className={`${styles.slection_card} ${
            activeLink === 'received_order' ? styles.activeLink : ''
          }`}
          onClick={() => handleClick('received_order')}
        >
          <Image
            className={styles.talentdashboardimages}
            src={require('../../Asset/Images/Totalorder.png')}
            alt="Picture of the Totalorder"
          />
          <h3 className={styles.orderheading}>Total order Received</h3>
        </Link>

        <Link
          href="#completed_order"
          className={`${styles.slection_card} ${
            activeLink === 'completed_order' ? styles.activeLink : ''
          }`}
          onClick={() => handleClick('completed_order')}
        >
          <Image
            className={styles.talentdashboardimages}
            src={require('../../Asset/Images/TotalorderDelivered.png')}
            alt="Picture of the TotalorderDelivered"
          />
          <h3 className={styles.orderheading}>Total order Delivered </h3>
        </Link>

        <Link
          href="#total_earning"
          className={`${styles.slection_card} ${
            activeLink === 'total_earning' ? styles.activeLink : ''
          }`}
          onClick={() => handleClick('total_earning')}
        >
          <Image
            className={styles.talentdashboardimages}
            src={require('../../Asset/Images/OverallEarnings.png')}
            alt="Picture of the OverallEarnings"
          />
          <h3 className={styles.orderheading}>Overall Earnings</h3>
        </Link>

        <Link
          href="#total_rating"
          className={`${styles.slection_card} ${
            activeLink === 'total_rating' ? styles.activeLink : ''
          }`}
          onClick={() => handleClick('total_rating')}
        >
          <Image
            className={styles.talentdashboardimages}
            src={require('../../Asset/Images/OverallRatings.png')}
            alt="Picture of the OverallRatings"
          />
          <h3 className={styles.orderheading}>Over all Ratings</h3>
        </Link>
      </div>

      {/* </Box> */}
      <div id="recevied_order" className={styles.container_sub_child}>
        {/* Recieved Order */}
        <div>
          <RecievedOrderCard />
        </div>
      </div>
      <div id="recevied_order" className={styles.container_sub_child}>
        {/* Review Order */}
        <div>
          <ReviewedOrderCard />
        </div>
      </div>

      <div>
        <RetakeOrderCard />
      </div>

      <div id="completed_order" className={styles.container_sub_child}>
        {/* Completed Order */}
        <div>
          <CompletedOrderCard />
        </div>
      </div>

      <div>
        <Link
          href="artist_order_details"
          className={styles.view_btn}
          variant="outlined"
          style={{ color: '#fff' }}
        >
          view more
        </Link>
      </div>

      <div id="total_earning" className={styles.container_sub_child}>
        {/* Total Earning */}
        <h1 className={styles.btnreceivedorder} variant="outlined">
          Total Earning
        </h1>

        <div className={styles.artist_dashboard_width_100_flex}>
          <div className={styles.cardbackgroundcolor}>
            <div>
              <div className={styles.cardweek}>This Week</div>
              <div className={styles.cardvalues}>
                {artistEarnings?.week_report
                  ? parseInt(artistEarnings?.week_report) >= 1000
                    ? parseInt(artistEarnings?.week_report).toLocaleString()
                    : artistEarnings?.week_report
                  : '0'}
              </div>
            </div>
            <div className={styles.cardprogress}>15%</div>
            {/* </AspectRatio> */}
          </div>

          <div className={styles.cardbackgroundcolor}>
            <div>
              <div className={styles.cardweek}>This Month</div>
              <div className={styles.cardvalues}>
                {artistEarnings?.month_report
                  ? parseInt(artistEarnings?.month_report) >= 1000
                    ? parseInt(artistEarnings?.month_report).toLocaleString()
                    : artistEarnings?.month_report
                  : '0'}
              </div>
            </div>
            <div className={styles.cardprogress}>25%</div>
          </div>

          <div className={styles.cardbackgroundcolor}>
            <div>
              <div className={styles.cardweek}>Over all</div>
              <div className={styles.cardvalues}>
                {artistEarnings?.overall_report
                  ? parseInt(artistEarnings?.overall_report) >= 1000
                    ? parseInt(artistEarnings?.overall_report).toLocaleString()
                    : artistEarnings?.overall_report
                  : '0'}
              </div>
            </div>
            <div className={styles.cardprogress}>50%</div>
          </div>
        </div>
      </div>

      <div id="total_rating" className={styles.container_sub_child}>
        <div sx={{ flexGrow: 1 }}>
          <h1>OVERALL RATINGS</h1>
        </div>

        <CircularProgressbarWithChildren
          value={progressValue}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: '#cea234',
            trailColor: '#fff',
            textColor: '#fff',
          })}
          className={styles.progress_parent}
        >
          <div style={{ width: '84%', textAlign: 'center' }}>
            <div
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#cea234' }}
            >
              {number} +
            </div>
            <div
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#cea234' }}
            >
              Total Rating
            </div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  )
}
