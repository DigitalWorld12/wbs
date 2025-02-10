import Head from 'next/head'
import styles from '../styles/ArtistPackages.module.css'
import React from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import Artist_Packages from '../src/components/artist/artist_package'

function artist_package() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          <div style={{ marginTop: 40 }}>
            <Artist_Packages />
          </div>
          <div className={styles.First_Name_Container}></div>

          <div className={styles.artist_package_margin_1o_width_height}></div>
          <div
            className={styles.artist_package_margin_10_width_margintop_20}
          ></div>

          <div className={styles.artist_package_marginleft_width_margintop_20}>
            <div className={styles.artist_package_height_20}></div>
            <div className={styles.artist_package_height_20}></div>
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  )
}
export default artist_package
