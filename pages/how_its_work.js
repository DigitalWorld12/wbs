import Head from 'next/head'
import styles from '../styles/HowItsWork.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import How_Its_Work from '../src/components/artist/how_its_work'

function artist_How_It_Work() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          <How_Its_Work />
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}
export default artist_How_It_Work
