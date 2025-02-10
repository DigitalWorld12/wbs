/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from '../../../styles/ArtistRequest.module.css'
// import styles from "../styles/ArtistRequest.module.css";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Api } from '../../config/Config'
import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#CEA234',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))
function SelectOccasionPreview({ setOrderData, orderData }) {
  const [occasions, setOccasions] = useState([orderData?.occasion])
  const selectedOccasionId = orderData?.occasion_id

  useEffect(() => {
    const getOcassions = (content) => {
      axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + '/api/occasions')
        .then((response) => {
          const occasionData = response.data.data
          setOccasions(occasionData)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    getOcassions()
  }, [])

  const handleOcassion = (e) => {
    setOrderData({ ...orderData, occasion_id: e.target.value })
  }

  return (
    <>
      <div className={styles.artist_occasion_sub_parent}>
        <h2 className={styles.selectoccasion}>Select Occasion</h2>
        <div className={`${styles.artist_occasion_sub_parent_child}`}>
          {occasions.map((occasion) => (
            <div key={occasion?.id} className={styles.occasionOption}>
              <Image
                className={`${styles.un_selected} ${
                  selectedOccasionId === occasion?.id ? styles.selected : ''
                }`}
                src={occasion?.image}
                alt=""
                width={100}
                height={100}
              />
              <span style={{ color: '#fff' }}>{occasion?.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default SelectOccasionPreview
