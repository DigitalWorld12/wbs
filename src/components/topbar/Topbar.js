import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import styles from '../../../styles/Topbar.module.css'
import { reactLocalStorage } from 'reactjs-localstorage'
import Navigationbar from '../../higherComponents/Navigationbar'
import NavigationbarMobile from '../../higherComponents/NavigationbarMobile'

import { Api } from '../../config/Config'
import { useRouter } from 'next/router'
import axios from 'axios'
import localStorage from 'local-storage'
import NotificationBell from '../NotificationBell/NotificationBell'
import NotificationCounts from '../NotificationBell/NotificationCount'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YoutubeIcon from '@mui/icons-material/YouTube'
import SearchIcon from '@mui/icons-material/Search'

function Topbar(props) {
  const { isNavBarOpen, setIsNavBarOpen } = props

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [localImage, setLocalImage] = useState()
  const [click, setOnclick] = useState(false)
  const [token, setToken] = useState(null)
  const [count, setCount] = useState(null)
  const [banks, setBanks] = useState([])

  let localData = ''
  let artistData = ''

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    localData = reactLocalStorage?.getObject('loginAuth')
    artistData = reactLocalStorage?.getObject('isArtist')
  } else {
    localData = ''
    artistData = ''
  }

  useEffect(() => {
    getLocalImage()

    setToken(localStorage.get('loginAuth')?.authorisation?.token)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const artistdata = reactLocalStorage.getObject('isArtist')
      const artistId = artistdata?.data?.id
      try {
        const response = await axios.get(
          `${baseURL}/api/artist/all-banks?artist_id=${artistId}`,
          {
            headers: {
              Authorization:
                'Bearer ' + localStorage.get('loginAuth')?.authorisation?.token,
            },
          },
        )

        // Check if the data length is greater than 0
        if (response?.data?.data?.length > 0) {
          setBanks(response.data.data)
          console.log(response?.data?.data, 'testing for bank')
        } else {
          // Handle the case when there is no data
          console.log('No data received')
        }
      } catch (error) {
        console.error('Error:', error)
        // Handle errors as needed
      }
    }
    fetchData()
  }, [])
  const getLocalImage = async () => {
    if (localData !== null) {
      setLocalImage(
        localData?.updated_data
          ? localData?.updated_data?.user_image
          : localData?.user?.user_image,
      )
    } else {
    }
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = async () => {
    await axios
      .post(
        // Api?.LOGOUT
        `${baseURL}/api/auth/logout`,
        null,
        {
          headers: {
            Authorization:
              'Bearer ' +
              reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
          },
        },
      )
      .then((response) => {
        router.push({
          pathname: '/login',
        })
      })
      .catch((error) => {
        if (error?.response?.data?.message === 'Token has expired') {
          reactLocalStorage?.remove('loginAuth')
          router.push({
            pathname: '/login',
          })
        }
      })
  }

  const getNotification = () => {
    axios
      .get(`${baseURL}/api/user-notifications`, {
        headers: {
          Authorization:
            'Bearer' +
            reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
        },
      })
      .then((response) => {
        const notificationCount = response?.data?.notification_count
        console.log(notificationCount, 'tttt')
        if (notificationCount > 0) {
          // Assuming setCount is a valid function to set notification count
          setCount(notificationCount)
        } else {
          console.log('No Notifications to Display')
        }
      })

      .catch((error) => {
        console.error(error)
      })
  }
  const getRead = () => {
    axios
      .get(`${baseURL}/api/read-notification/2`, {
        headers: {
          Authorization:
            'Bearer' +
            reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
        },
      })
      .then((response) => {
        console.log(response?.data, 'testing  for GetRead')
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    getNotification()
    getRead()
  }, [])
  const notificationCounts = 30
  return (
    <div>
      {token ? (
        <>
          <div className={styles.show_mobile}>
            <Link href={'/'} className={styles.mobile_logo}>
              <Image
                src={require('../../Asset/logo/logo.png')}
                alt="Picture of the Logo"
              />
            </Link>
          </div>
          <div className={styles.topBarMainDiv}>
            <div className={styles.mobile_nav}>
              <NavigationbarMobile />
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                className={styles.white_icon}
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                className={styles.white_icon}
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.youtube.com/"
                target="_blank"
                className={styles.white_icon}
              >
                <YoutubeIcon />
              </Link>
            </div>
            <div className={styles.hide_mobile}>
              <Link href={'/'} className={styles.mobile_logo}>
                <Image
                  src={require('../../Asset/logo/logo.png')}
                  alt="Picture of the Logo"
                />
              </Link>
              <div className={styles.hide_icon}>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className={styles.white_icon}
                >
                  <FacebookIcon />
                </Link>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  className={styles.white_icon}
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href="https://www.youtube.com/"
                  target="_blank"
                  className={styles.white_icon}
                >
                  <YoutubeIcon />
                </Link>
              </div>
            </div>
            <div className={styles.topbarCenter}>
              <div className={styles.main_nav}>
                <Navigationbar />
              </div>
            </div>

            <div className={styles.topbarRight}>
              <div
                className={styles.openButton}
                onClick={() => setIsNavBarOpen(true)}
              >
                <SearchIcon />
              </div>

              <Box className={styles.icon_box2}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={`${baseURL}/${localImage}`}
                      className={styles.avatar}
                    />

                    {count > 0 ? (
                      <NotificationBell notificationCount={count} />
                    ) : null}
                  </IconButton>
                </Tooltip>

                <Menu
                  className={styles.menu}
                  sx={{ mt: '25px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <h3>User Menu</h3>
                  <Link href="/dashboard">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === '/dashboard'
                          ? styles.activeLink
                          : ''
                      }
                    >
                      <Typography textAlign="center">User Dashboard</Typography>
                    </MenuItem>
                  </Link>
                  <Link href="/track_my_order">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === '/track_my_order'
                          ? styles.activeLink
                          : ''
                      }
                    >
                      <Typography textAlign="center">Track My Order</Typography>

                      {count > 0 ? (
                        <NotificationCounts notificationCounts={count} />
                      ) : null}
                    </MenuItem>
                  </Link>
                  {localData?.status && (
                    <Link href="/edit_profile">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/edit_profile'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">Edit Profile</Typography>
                      </MenuItem>
                    </Link>
                  )}

                  {localData?.user?.user_type === 'agency' && (
                    <>
                      <h3>Representative Menu</h3>

                      {localData?.user && (
                        <Link
                          href={
                            artistData?.status
                              ? '/artist_profile_details_agent'
                              : '/artist_profile_details_agent'
                          }
                        >
                          {console.log(artistData?.status, 'tesS')}
                          <MenuItem
                            onClick={handleCloseUserMenu}
                            className={
                              router.pathname ===
                              (artistData?.status
                                ? '/artist_profile_details_agent'
                                : '/artist_profile_details_agent')
                                ? styles.activeLink
                                : ''
                            }
                          >
                            <Typography textAlign="center">
                              {!artistData?.status
                                ? 'Register As Artist'
                                : 'Register As Artist'}
                            </Typography>
                          </MenuItem>
                        </Link>
                      )}
                      {localData?.user && (
                        <Link href="/representive_dashboard">
                          <MenuItem
                            onClick={handleCloseUserMenu}
                            className={
                              router.pathname === '/artist_recording_agent'
                                ? styles.activeLink
                                : ''
                            }
                          >
                            <Typography textAlign="center">
                              Representative Dashboard
                            </Typography>
                          </MenuItem>
                        </Link>
                      )}
                    </>
                  )}

                  <h3>Artist Menu</h3>

                  {artistData?.status && (
                    <Link href="/artist_dashboard">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/artist_dashboard'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          Artist Dashboard
                        </Typography>
                        {count > 0 ? (
                          <NotificationCounts notificationCounts={count} />
                        ) : null}
                      </MenuItem>
                    </Link>
                  )}

                  {localData?.user && (
                    <Link
                      href={
                        artistData?.status
                          ? '/artist_profile_details_updated'
                          : '/artist_profile_details'
                      }
                    >
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname ===
                          (artistData?.status
                            ? '/artist_profile_details_updated'
                            : '/artist_profile_details')
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          {!artistData?.status
                            ? 'Register As Artist'
                            : 'Edit Artist Profile'}
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}

                  {artistData?.status && (
                    <Link href="/artist_recording_preview">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/artist_recording_preview'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          Edit Artist Recording
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {artistData?.status && (
                    <Link href="/artist_select_service">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/artist_select_service'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          Edit Services
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}

                  {artistData?.status && (
                    <Link href="/artist_add_document">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/artist_add_document'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          Edit Documents
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {artistData?.status && (
                    <Link href="/artist_earning">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/artist_earning'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          Artist Earning
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {artistData?.status && (
                    <Link href="/artist_order_details">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/artist_order_details'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          Artist All Orders
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {artistData?.status && <h3>Artist Bank Info</h3>}

                  {artistData?.status && (
                    <Link href="/artist_payment_card">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/artist_payment_card'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          Add {artistData?.data?.nick_name} Bank Detail
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {banks && (
                    <>
                      {artistData?.status && (
                        <Link href="/artist_payment_card_view">
                          <MenuItem
                            onClick={handleCloseUserMenu}
                            className={
                              router.pathname === '/artist_payment_card_view'
                                ? styles.activeLink
                                : ''
                            }
                          >
                            <Typography textAlign="center">
                              Edit Bank Detail
                            </Typography>
                          </MenuItem>
                        </Link>
                      )}
                    </>
                  )}

                  {artistData?.status && (
                    <Link href="/artist_statment">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/artist_statment'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          Artist Statement
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}

                  {artistData?.status && artistData?.data?.wallet_amount > 0 && (
                    <Link href="/artist_payment_withdraw">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className={
                          router.pathname === '/artist_payment_withdraw'
                            ? styles.activeLink
                            : ''
                        }
                      >
                        <Typography textAlign="center">
                          Widthdraw Amount
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}

                  <h3></h3>

                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.show_mobile}>
            <Link href={'/'} className={styles.mobile_logo}>
              <Image
                src={require('../../Asset/logo/logo.png')}
                alt="Picture of the Logo"
              />
            </Link>
          </div>
          <div className={styles.topBarMainDiv}>
            <div className={styles.mobile_nav}>
              <NavigationbarMobile />
              <Link
                href="https://facebook.com"
                target="_blank"
                className={styles.white_icon}
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                className={styles.white_icon}
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.youtube.com/"
                target="_blank"
                className={styles.white_icon}
              >
                <YoutubeIcon />
              </Link>
            </div>
            <div className={styles.hide_mobile}>
              <Link href={'/'} className={styles.logo}>
                <Image
                  src={require('../../Asset/logo/logo.png')}
                  alt="Picture of the Logo"
                />
              </Link>
              <div className={styles.hide_icon}>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className={styles.white_icon}
                >
                  <FacebookIcon />
                </Link>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  className={styles.white_icon}
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href="https://www.youtube.com/"
                  target="_blank"
                  className={styles.white_icon}
                >
                  <YoutubeIcon />
                </Link>
              </div>
            </div>
            <div className={styles.topbarCenter}>
              <div className={styles.main_nav}>
                <Navigationbar />
              </div>
            </div>
            <div className={styles.topbarRight}>
              <div
                className={styles.openButton}
                onClick={() => setIsNavBarOpen(true)}
              >
                <SearchIcon />
              </div>

              <Link className={styles.register_button} href="/signup">
                Sign Up
              </Link>
              <Link className={styles.login_button} href="/login">
                Login
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default Topbar
