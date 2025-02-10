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
  const [occasions, setOccasions] = useState()
  const [selectedOccasion, setSelectedOccasion] = useState(null)

  useEffect(() => {
    const getOcassions = (content) => {
      axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + '/api/occasions')
        .then((response) => {
          setOccasions(response.data.data)
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
    setSelectedOccasion(occasion)
  }

  return (
    <>
      <div>
        <h2 className={styles.selectoccasion}>Select Occasion</h2>
        <Box sx={{ flexGrow: 1 }}>
          <select
            className={styles.select}
            name="occasions"
            id=""
            onChange={(e) => handleOcassion(e)}
          >
            <option>SelectOccasion</option>
            {occasions?.map((item) => (
              <>
                <option className={styles.option} value={item.id}>
                  {item.name}
                </option>
              </>
            ))}
          </select>
        </Box>
      </div>
    </>
  )
}
export default SelectOccasion
