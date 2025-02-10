/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Topbar from '../topbar/Topbar'
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'
import axios from 'axios'
import { Api } from '../../config/Config'
import { reactLocalStorage } from 'reactjs-localstorage'
import localStorage from 'local-storage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function GoogleAuth() {
  const [token, setToken] = React.useState('')

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter()
  const [user, setUser] = React.useState({})
  const [userId, setUserId] = React.useState('')
  const getArtistData = async () => {
    const data = reactLocalStorage.getObject('loginAuth')
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    const token = data?.authorisation?.token
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
        reactLocalStorage.setObject('isArtist', response?.data)
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

  function fetchAbout(data) {
    axios
      .post(`${baseURL}/api/auth/social-auth`, {
        name: data?.name,
        email: data?.email,
        provider_id: data?.nbf,
        provider: 'google',
      })

      .then((response) => {
        if (response?.data?.status === true) {
          toast.success(response?.data.message)

          reactLocalStorage.setObject('loginAuth', response?.data)

          getArtistData(response?.data)
          const image = localStorage.get('loginAuth', response?.data).user
            ?.profile_image
          image ? router.push('/') : router.push('/edit_profile')
          return null
        } else {
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential)
    fetchAbout(userObject)

    document.getElementById('signInDiv').hidden = true
  }
  function handleSignOut(event) {
    setUser({})
    document.getElementById('signInDiv').hidden = false
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '645651761854-6su90c255m6mjbfcia0vqs13dduu9pl7.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    })
  }, [])

  useEffect(() => {
    const fetchAbout = () => {
      axios
        .post(`${baseURL}/api/auth/social-auth`, data)
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  return (
    <div>
      <ToastContainer className="tost" />

      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>

        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
      </Head>

      <div id="signInDiv"></div>

      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
    </div>
  )
}
