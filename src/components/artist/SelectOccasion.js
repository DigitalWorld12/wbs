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
function SelectOccasion({ setOrderData, orderData }) {
  const [occasions, setOccasions] = useState([])
  const [selectedOccasion, setSelectedOccasion] = useState(null)

  useEffect(() => {
    const getOcassions = (content) => {
      axios
        .get(
          // Api?.GET_OCCASIONS
          process.env.NEXT_PUBLIC_BASE_URL + '/api/occasions',
        )
        .then((response) => {
          const occasionData = response.data.data
          setOccasions(occasionData)
          if (!selectedOccasion && occasionData.length > 0) {
            setSelectedOccasion(occasionData[0])
            setOrderData({ ...orderData, occasion_id: occasionData[0].id })
          }
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
  const handleOccasionClick = (occasion) => {
    const updatedOccasions = occasions.map((o) => {
      if (o.id === occasion.id) {
        return { ...o, active: true }
      } else {
        return { ...o, active: false }
      }
    })

    setSelectedOccasion(occasion)
    setOccasions(updatedOccasions)
    setOrderData({ ...orderData, occasion_id: occasion.id })
  }

  return (
    <>
      <div className={styles.artist_occasion_sub_parent}>
        <h2 className={styles.selectoccasion}>Select Occasion</h2>
        <div className={`${styles.artist_occasion_sub_parent_child}`}>
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              className={styles.occasionOption}
              onClick={() => handleOccasionClick(occasion)}
            >
              <Image
                className={`${styles.un_selected} ${
                  selectedOccasion && selectedOccasion.id === occasion.id
                    ? styles.selected
                    : ''
                }`}
                src={occasion.image}
                alt=""
                width={100}
                height={100}
              />
              <span style={{ color: '#fff' }}>{occasion.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default SelectOccasion
