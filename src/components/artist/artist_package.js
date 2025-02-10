import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
// import styles from "../../../styles/ArtistProfile.module.css";
import styles from '../../../styles/ArtistPackages.module.css'
import TextField from '@mui/material/TextField'

import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import Button from '@mui/material/Button'

import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import Paper from '@mui/material/Paper'

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#000000',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
}))

export default function Artist_Package() {
  const value = 3.5
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* check start */}

      <div>
        <h2 className={styles.Artist_Packages_Heading}>Packages for Talent</h2>
        <p className={styles.Artist_Packages_Paragraph}>
          Qui quisquam repellat ut exercitationem est praesentium ullam aut
        </p>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            columns={14}
            className={styles.Container_Card}
          >
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <Item1>
                <div className={styles.Artist_icon_center}>
                  <h2 className={styles.ArtistFree}>Free</h2>
                </div>
                <p className={styles.message_paragraph}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut
                </p>
                <b className={styles.Digit_Bold}>
                  0<p className={styles.month}>/mo</p>
                </b>
                <h3 className={styles.smallest_Heading}>
                  ( Paid Yearly & Save Rs200 )
                </h3>
                <h2 className={styles.Overview_Heading}>Overview</h2>
                <p className={styles.Overview_Paragraph}>
                  Qui quisquam repella xercitationem est praesentium ullam aut
                </p>
                <Image
                  className={styles.image_set}
                  src={require('../../../src/Asset/Images/Vector_Star.png')}
                  alt="Picture of the Start"
                />
                <p className={styles.Heading_Points}>
                  Qui quisquam repella xercitationem.
                </p>
                <div className={styles.Point_Spacing}>
                  <Image
                    className={styles.image_set}
                    src={require('../../../src/Asset/Images/Vector_Star.png')}
                    alt="Picture of the Start"
                  />
                  <p className={styles.Heading_Points}>
                    Qui quisquam repella xercitationem.
                  </p>
                </div>
                <div className={styles.Point_Spacing}>
                  <Image
                    className={styles.image_set}
                    src={require('../../../src/Asset/Images/Vector_Star.png')}
                    alt="Picture of the Start"
                  />
                  <p className={styles.Heading_Points}>
                    Qui quisquam repella xercitationem.
                  </p>
                </div>

                <div className={styles.Point_Spacing_valid}>
                  <p className={styles.Valided}>
                    Valid Till 30th November 2022
                  </p>
                </div>
              </Item1>
            </Grid>
            {/* Second Grid Item */}
            <Grid item xs={4}>
              <Item1>
                <div className={styles.Artist_icon_center}>
                  <h2 className={styles.ArtistFree}>Grow</h2>
                </div>
                <p className={styles.message_paragraph}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut
                </p>
                <b className={styles.Digit_Bold}>
                  Rs1000
                  <p className={styles.month}>/mo</p>
                </b>
                <h3 className={styles.smallest_Heading}>
                  ( Paid Yearly & Save Rs200 )
                </h3>
                <h2 className={styles.Overview_Heading}>Overview</h2>
                <p className={styles.Overview_Paragraph}>
                  Qui quisquam repella xercitationem est praesentium ullam aut
                </p>
                <Image
                  className={styles.image_set}
                  src={require('../../../src/Asset/Images/Vector_Star.png')}
                  alt="Picture of the Start"
                />
                <p className={styles.Heading_Points}>
                  Qui quisquam repella xercitationem.
                </p>
                <div className={styles.Point_Spacing}>
                  <Image
                    className={styles.image_set}
                    src={require('../../../src/Asset/Images/Vector_Star.png')}
                    alt="Picture of the Start"
                  />
                  <p className={styles.Heading_Points}>
                    Qui quisquam repella xercitationem.
                  </p>
                </div>
                <div className={styles.Point_Spacing}>
                  <Image
                    className={styles.image_set}
                    src={require('../../../src/Asset/Images/Vector_Star.png')}
                    alt="Picture of the Start"
                  />
                  <p className={styles.Heading_Points}>
                    Qui quisquam repella xercitationem.
                  </p>
                </div>

                <div className={styles.Point_Spacing_valid}>
                  <Button className={styles.btn_Glow} variant="outlined">
                    Get Grow
                  </Button>
                </div>
              </Item1>
            </Grid>
            {/* Third Grid Item */}
            <Grid item xs={4}>
              <Item1>
                <div className={styles.Artist_icon_center}>
                  <h2 className={styles.ArtistFree}>Scale</h2>
                </div>
                <p className={styles.message_paragraph}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut
                </p>
                <b className={styles.Digit_Bold}>
                  Rs1200
                  <p className={styles.month}>/mo</p>
                </b>
                <h3 className={styles.smallest_Heading}>
                  ( Paid Yearly & Save Rs200 )
                </h3>
                <h2 className={styles.Overview_Heading}>Overview</h2>
                <p className={styles.Overview_Paragraph}>
                  Qui quisquam repella xercitationem est praesentium ullam aut
                </p>
                <Image
                  className={styles.image_set}
                  src={require('../../../src/Asset/Images/Vector_Star.png')}
                  alt="Picture of the Start"
                />
                <p className={styles.Heading_Points}>
                  Qui quisquam repella xercitationem.
                </p>
                <div className={styles.Point_Spacing}>
                  <Image
                    className={styles.image_set}
                    src={require('../../../src/Asset/Images/Vector_Star.png')}
                    alt="Picture of the Start"
                  />
                  <p className={styles.Heading_Points}>
                    Qui quisquam repella xercitationem.
                  </p>
                </div>
                <div className={styles.Point_Spacing}>
                  <Image
                    className={styles.image_set}
                    src={require('../../../src/Asset/Images/Vector_Star.png')}
                    alt="Picture of the Start"
                  />
                  <p className={styles.Heading_Points}>
                    Qui quisquam repella xercitationem.
                  </p>
                </div>

                <div className={styles.Point_Spacing_valid}>
                  <Button className={styles.btn_Glow} variant="outlined">
                    Get Scale
                  </Button>
                </div>
              </Item1>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          {/* Main Grid End */}
        </Box>
      </div>

      {/* check end */}
      <Grid item xs={12}>
        <Image
          width={1230}
          src={require('../../../src/Asset/Images/LoremIpsumDriImage.png')}
          alt="Picture of the LoremIpsumDriImage"
        />
      </Grid>

      <Grid item xs={12}>
        <h1 className={styles.artist_package_grid_heading_h1}>
          KNOW MORE ABOUT RECORDING
        </h1>
        <p className={styles.artist_package_grid_paragraph}>
          Read frequently asked questions
        </p>

        <Box
          sx={{
            width: 1000,
            maxWidth: '100%',
            margin: 'auto',
            height: 600,
          }}
        >
          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={
              'How long does it take for my Celebrity Video to be delivered?'
            }
            id="fullWidth"
            className={styles.artist_package_text_field}
          />

          <div className={styles.artist_package_height_20}></div>

          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={
              'Can I have a celebrity join my video call or virtual event?'
            }
            id="fullWidth"
            className={styles.artist_package_text_field}
          />

          <div className={styles.artist_package_height_20}></div>

          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={
              'What are the benefits of promoting my Brand using WBS?'
            }
            id="fullWidth"
            className={styles.artist_package_text_field}
          />

          <div className={styles.artist_package_height_20}></div>

          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={'When was ( Actor  name ) born?'}
            id="fullWidth"
            className={styles.artist_package_text_field}
          />

          <div className={styles.artist_package_height_20}></div>

          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={'Which Movie hass ( Actor  name ) acted in?'}
            id="fullWidth"
            className={styles.artist_package_text_field}
          />
          <div className={styles.artist_package_height_20}></div>
          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={'What is ( Actor  name ) age?'}
            id="fullWidth"
            className={styles.artist_package_text_field}
          />
          <div></div>
          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={'Can I get personlazied wish from ( Actor  name )?'}
            id="fullWidth"
            className={styles.artist_package_text_field}
          />
        </Box>
      </Grid>
    </Box>
  )
}
