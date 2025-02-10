import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import styles from '../../../styles/TalentEarning.module.css'
import Image from 'next/image'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Talent_Table from './talent_table'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import axios from 'axios'
import { Api } from '../../config/Config'
import { useEffect } from 'react'
import localStorage from 'local-storage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage'
import { fetchCurrency } from '@/redux/actions/currencyActions'

export default function Talent_Earning() {
  const [activeLink, setActiveLink] = useState(null)

  const handleClick = (linkId) => {
    setActiveLink(linkId)
  }

  const [artistEarnings, setArtistEarnings] = useState('')
  const [artistEarningsLoader, setArtistEarningsLoader] = useState(false)

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const GetDashboard = async () => {
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id

    try {
      await axios
        .get(
          // Api?.ARTIST_DASHBOARD,

          `${baseURL}/api/artist/dashboard?artist_id=${artistId}`,

          {
            headers: {
              Authorization:
                'Bearer ' + localStorage.get('loginAuth')?.authorisation?.token,
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
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetDashboard()
  }, [])

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  //Currency
  const dispatch = useDispatch()
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyData,
  )
  useEffect(() => {
    dispatch(fetchCurrency())
  }, [dispatch])
  const filteredData = currencyData?.data.filter((item) => item.status === 1)
  const symbol = []
  filteredData?.forEach((item, index) => {
    symbol.push(item.symbol)
  })
  return (
    <div className={styles.container1}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1 className={styles.Talent_Dashboard_TopHeading}>
              Talent Earning
            </h1>
          </Grid>
        </Grid>
      </Box>

      {/* Session Orders  */}
      <div className={styles.artist_dashboard_width_100_flex}>
        <div className={`${styles.slection_card} `}>
          <Image
            className={styles.talentdashboardimages}
            src={require('../../Asset/Images/Totalorder.png')}
            alt="Picture of the Totalorder"
          />
          <h3 className={styles.orderheading}>Total order Received</h3>
          <h3 className={styles.orderheading_amount}>
            {artistEarnings?.total_orders
              ? parseInt(artistEarnings?.total_orders) >= 1000
                ? parseInt(artistEarnings?.total_orders).toLocaleString()
                : artistEarnings?.total_orders
              : '0'}
          </h3>
        </div>

        <div className={`${styles.slection_card} `}>
          <Image
            className={styles.talentdashboardimages}
            src={require('../../Asset/Images/TotalorderDelivered.png')}
            alt="Picture of the TotalorderDelivered"
          />
          <h3 className={styles.orderheading}>Last Transaction</h3>
          <h3 className={styles.orderheading_amount}>
            {symbol ? symbol : ''}{' '}
            {artistEarnings?.last_transaction
              ? parseInt(artistEarnings?.last_transaction) >= 1000
                ? parseInt(artistEarnings?.last_transaction).toLocaleString()
                : artistEarnings?.last_transaction
              : '0'}
          </h3>
        </div>

        <div className={`${styles.slection_card} `}>
          <Image
            className={styles.talentdashboardimages}
            src={require('../../Asset/Images/OverallEarnings.png')}
            alt="Picture of the OverallEarnings"
          />
          <h3 className={styles.orderheading}>Overall Earnings</h3>
          <h3 className={styles.orderheading_amount}>
            {symbol ? symbol : ''}{' '}
            {artistEarnings?.overall_earning
              ? parseInt(artistEarnings?.overall_earning) >= 1000
                ? parseInt(artistEarnings?.overall_earning).toLocaleString()
                : artistEarnings?.overall_earning
              : '0'}
          </h3>
        </div>

        <div className={`${styles.slection_card} `}>
          <Image
            className={styles.talentdashboardimages}
            src={require('../../Asset/Images/OverallRatings.png')}
            alt="Picture of the OverallRatings"
          />
          <h3 className={styles.orderheading}>Payment in your account</h3>
          <h3 className={styles.orderheading_amount}>
            {symbol ? symbol : ''}{' '}
            {artistEarnings?.payment_in_account
              ? parseInt(artistEarnings?.payment_in_account) >= 1000
                ? parseInt(artistEarnings?.payment_in_account).toLocaleString()
                : artistEarnings?.payment_in_account
              : '0'}
          </h3>
        </div>
      </div>

      <Link className={styles.btn_Book_Now} href="/artist_payment_withdraw">
        Ask for Payment
      </Link>

      <div id="total_earning" className={styles.container_sub_child}>
        {/* Total Earning */}

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
    </div>
  )
}
