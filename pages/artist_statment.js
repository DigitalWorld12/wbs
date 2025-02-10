/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../styles/Statment.module.css'
import ArtistStatment from '../src/components/artist/ArtistStatment'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'

import React, { useEffect, useState } from 'react'
// import StatementTable from "../components/StatementTable";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import axios from 'axios'
import localStorage from 'local-storage'
import { reactLocalStorage } from 'reactjs-localstorage'

function artist_statment() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [data, setData] = useState([])
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const getStatement = async () => {
    try {
      if (typeof window !== 'undefined') {
        const artistdata = reactLocalStorage.getObject('isArtist')
        const artistId = artistdata?.data?.id
        const userData = reactLocalStorage.getObject('loginAuth')
        const userId = userData?.user?.id
        const token = userData?.authorisation?.token
        await axios
          .get(
            `${baseUrl}/api/artist-statement?artist_id=${artistId}`,

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(function (response) {
            if (response?.data?.status === true) {
              setData(response?.data?.data)
            }
          })
          .catch((error) => {
            toast.error(error)
          })
      } else {
        console.error(
          'localStorage is not available in the server-side context',
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getStatement()
  }, [])
  return (
    <div className={styles.container}>
      <Topbar />

      <h1>Statement Table</h1>
      <div className={styles.date_filter}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
        />
      </div>
      <ArtistStatment
        transactions={data}
        startDate={startDate}
        endDate={endDate}
      />
      <Footer />
    </div>
  )
}

export default artist_statment
