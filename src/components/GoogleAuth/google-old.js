/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'
import axios from 'axios'
import { Api } from '../../config/Config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function GoogleAuth() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const [user, setUser] = React.useState({})
  const data = {
    name: user.name,
    email: user.email,
    provider: 'google',
    provider_id: user.nbf,
  }
  function fetchAbout(response) {
    axios
      .post(`${baseURL}/api/auth/social-auth`, {
        name: user?.name,
        email: user?.email,
        provider_id: user?.nbf,
        provider: 'google',
      })

      .then((response) => {
        if (response.data.status === true) {
          toast.success(response?.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential)
    setUser(userObject)
    fetchAbout(user)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <div id="signInDiv"></div>

      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3
            style={{
              color: 'white',
              height: 50,
              fontSize: 30,
            }}
          >
            {user.name}
          </h3>
        </div>
      )}
    </div>
  )
}
