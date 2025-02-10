import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
// import styles from "../../../styles/ArtistProfile.module.css";
import styles from '../../../styles/ArtistNotifications.module.css'
import TextField from '@mui/material/TextField'

import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import Button from '@mui/material/Button'

import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import Paper from '@mui/material/Paper'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Table } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
export default function Artist_Notification() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* check start */}

      <div>
        <h2 className={styles.Artist_Notification_Heading}>
          Talent Notifications
        </h2>
      </div>
      <div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {/* 1st Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* 2nd Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* 3th Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* 4th Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* 5th Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* 6th Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* 7th Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* 8th Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* 9th Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* 10th Row */}
            <TableHead>
              <TableRow>
                <TableCell className={styles.h}>
                  <RocketLaunchIcon />
                </TableCell>
                <TableCell className={styles.Notification_Message}>
                  Qui quisquam repellat ut exercitationem est praesentium ullam
                  aut... Readmore.
                </TableCell>

                <TableCell className={styles.h}>10th-Sep-22</TableCell>
                <TableCell className={styles.h} align="right">
                  <MoreVertIcon></MoreVertIcon>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
      {/* check end */}

      <Grid item xs={12}>
        <h1 className={styles.Artist_Notification_Heading_h1}>
          KNOW MORE ABOUT RECORDING
        </h1>
        <p className={styles.Artist_Notification_Heading_p}>
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
            className={styles.Artist_Notification_Text_field}
          />

          <div className={styles.Artist_Notification_Height_20}></div>

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
            className={styles.Artist_Notification_Text_field}
          />

          <div className={styles.Artist_Notification_Height_20}></div>

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
            className={styles.Artist_Notification_Text_field}
          />

          <div className={styles.Artist_Notification_Height_20}></div>

          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={'When was ( Actor  name ) born?'}
            id="fullWidth"
            className={styles.Artist_Notification_Text_field}
          />

          <div className={styles.Artist_Notification_Height_20}></div>

          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={'Which Movie hass ( Actor  name ) acted in?'}
            id="fullWidth"
            className={styles.Artist_Notification_Text_field}
          />
          <div className={styles.Artist_Notification_Height_20}></div>
          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={'What is ( Actor  name ) age?'}
            id="fullWidth"
            className={styles.Artist_Notification_Text_field}
          />
          <div className={styles.Artist_Notification_Height_20}></div>
          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
              },
            }}
            fullWidth
            placeholder={'Can I get personlazied wish from ( Actor  name )?'}
            id="fullWidth"
            className={styles.Artist_Notification_Text_field}
          />
        </Box>
      </Grid>
    </Box>
  )
}
