import * as React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { styled, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import styles from '../../styles/Footer.module.css'
import Link from 'next/link'

export default function TopBarToggle() {
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        backgroundColor: '#000',
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ flexGrow: 1 }} className={styles.box}>
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <Link href="/">
              <h2 className={styles.sub_heading}>Home</h2>
            </Link>
            <p className={styles.content}>Latest Content</p>
            <p className={styles.content}>Categories to explore</p>
            <p className={styles.content}>Featured Video</p>
            <p className={styles.content}>Trending Talent</p>
          </Grid>
          <Grid item xs={2}>
            <Link href="/artist_categories">
              <h2 className={styles.sub_heading}>Categories</h2>
            </Link>
            <p className={styles.content}>Viewed Talent</p>
            <p className={styles.content}>Suggested Talent</p>
            <p className={styles.content}>Testimonials</p>
            <p className={styles.content}>New Talent</p>
          </Grid>
          <Grid item xs={2}>
            <Link href="/how_its_work">
              <h2 className={styles.sub_heading}>How It Works</h2>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link href="/promote_your_business">
              <h2 className={styles.sub_heading}>For Business</h2>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link href="/track_my_order">
              <h2 className={styles.sub_heading}>My Order</h2>
            </Link>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
      <Divider />
    </Box>
  )

  return (
    <div>
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer('top', true)}
          >
            <MenuIcon />
          </IconButton>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  )
}
