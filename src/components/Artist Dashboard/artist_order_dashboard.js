import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import styles from '../../../styles/TalentDashboard.module.css'
import Image from 'next/image'
import Button from '@mui/material/Button'
import DataTable from './table'
// import OrderCard from "./OrderCard";
// import CompleteOrderCard from "./CompleteOrderCard";
import Link from 'next/link'
import RecievedOrderCard from './RecievedOrderCard'
import RecievedAllOrderCard from './RecievedAllOrderCard'
import CompletedAllOrderCard from './CompletedAllOrderCard'
import axios from 'axios'
import { useState, useEffect } from 'react'

import { reactLocalStorage } from 'reactjs-localstorage'
import { useRouter } from 'next/router'
export default function ArtistOrderDashboard() {
  const [odrers, setOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/artist/orders?search=${searchQuery}`,
        {
          headers: {
            Authorization:
              'Bearer ' +
              reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
          },
        },
      )
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching data from API : ', error)
    }
  }

  const router = useRouter()

  const [artistName, setArtistName] = useState()
  const getArtistData = async () => {
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    const userId = data?.id

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
        if (response?.data?.status === true) {
          setArtistName(response?.data?.data?.nick_name)
        }
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
    getArtistData()
  }, [])
  const handleSearch = (event) => {
    event.preventDefault() // Prevents the default form submission behavior
    fetchData() // Fetches the data based on the search query
  }

  const handleClear = () => {
    setSearchQuery('') // Clears the search query

    fetchData()
  }
  return (
    <div className={styles.container}>
      <form className={styles.form_search} onSubmit={handleSearch}>
        <input
          type="search"
          name="search"
          placeholder="search your order"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" disabled={!searchQuery}>
          Search
        </button>
        <button onClick={handleClear}>Clear</button>
      </form>

      {/* Session Heading for TalentDashboard */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1 className={styles.talentdashboardtopHeading}>
              All Orders For {artistName ? artistName : ''}
            </h1>
          </Grid>
        </Grid>
      </Box>

      {/* Session Orders  */}

      {/* Table Section */}
      <div className={styles.Main_Container_Setting}>
        {/* <RecievedOrderCard /> */}
        <RecievedAllOrderCard orders={odrers} />
      </div>

      {/* Completed Order */}

      <CompletedAllOrderCard orders={odrers} />
    </div>
  )
}
