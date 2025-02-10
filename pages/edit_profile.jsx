/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../styles/EditProfile.module.css'
import React, { useEffect, useState } from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import EditProfileCard from '../src/components/editProfileCard/EditProfileCard'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useRouter } from 'next/router'

import localStorage from 'local-storage'
import { Suspense } from 'react'

function edit_profile() {
  const router = useRouter()

  const [data, setData] = useState(null)

  useEffect(() => {
    const data = reactLocalStorage.getObject('loginAuth')

    if (Object.keys(data).length === 0) {
      router.push('/login')
    }
  }, [])
  useEffect(() => {
    const token = localStorage?.get('loginAuth')
    const isValidToken = true

    if (isValidToken) {
      setData(token)
    } else {
      localStorage.remove('loginAuth')
      setData(null)
    }
  }, [])
  if (data === null) {
    return <div> Loading ...</div>
  }
  return (
    <div>
      <div className={styles.container}>
        <Suspense>
          <Topbar />
          <h1 className={styles.edit_profile_heading}>EDIT PROFILE</h1>
          {data && data?.user?.user_type === 'artist' ? (
            <EditProfileCard isArtist={true} />
          ) : (
            <EditProfileCard isArtist={false} />
          )}
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
export default edit_profile
