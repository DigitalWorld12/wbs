/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/material/Box'
import Router, { withRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import localStorage from 'local-storage'

export default function ArtistCard({
  id,
  imgUrl,
  name,
  category,
  price,
  data,
}) {
  function updateVisitedArtists(artist) {
    const visitedArtists = localStorage?.get('visitedArtist') || []

    const existingIndex = visitedArtists?.findIndex(
      (visitedArtist) => visitedArtist?.id === artist?.id,
    )

    if (existingIndex !== -1) {
      // Artist already exists, update their visited flag
      visitedArtists[existingIndex].visited = true
    } else {
      // Artist doesn't exist, add them with the visited flag set to true
      visitedArtists.push({ ...artist, visited: true })
    }

    localStorage?.set('visitedArtist', visitedArtists)
  }

  return (
    <Card
      sx={{
        width: 240,
        backgroundColor: '#000',
        borderRadius: 5,
        height: 350,
        display: 'flex',
        justifyContent: 'center',
      }}
      onClick={() => {
        updateVisitedArtists(data)
        Router.push({
          pathname: '/artist_profile',
          query: { item: id },
        })
      }}
    >
      <img src={imgUrl} alt="" width={240} height={260} />

      <Box
        sx={{ display: 'flex', position: 'absolute', bottom: 10, width: 200 }}
      >
        <div>
          <Typography level="body3" className={styles.Artist_Star_Name}>
            {name}
          </Typography>
          <div className={styles.artist_card_display_width}>
            <Typography
              fontSize="lg"
              fontWeight="lg"
              className={styles.Artist_TV_Star}
            >
              {category}
            </Typography>
            <Typography
              variant="solid"
              size="sm"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: 'auto', fontWeight: 600 }}
              className={styles.Artist_PKR}
            >
              {price}
            </Typography>
          </div>
        </div>
      </Box>
    </Card>
  )
}
