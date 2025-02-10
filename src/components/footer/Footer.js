/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import styles from '../../../styles/Footer.module.css'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { border, display } from '@mui/system'
import axios from 'axios'
function Footer() {
  const [footerData, setFooterData] = useState(null)
  const [footerSetting, setFooterSetting] = useState(null)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://dev7.sidat.digital/wbs/api/footer',
      )
      setFooterData(response?.data?.data)
      setFooterSetting(response?.data?.setting)
      console.log(response?.data?.setting)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  for (let i = 0; i < footerSetting?.length; i++) {
    const currentObject = footerSetting[i]

    // Loop through the properties of the current object
    for (const key in currentObject) {
      if (currentObject.hasOwnProperty(key)) {
        const value = currentObject[key]
      }
    }
  }
  return (
    <div className={styles.footer_width_100}>
      <footer className={styles.footer}>
        <div className={styles.footer_main_container}>
          {footerSetting?.map((currentObject, index) => (
            <div className={styles.heading_container} key={index}>
              <h1 className={styles.heading}>{currentObject?.footer_title}</h1>
              <Link href={currentObject?.contact_us}>
                <button className={styles.btn}>{currentObject?.ask_for}</button>
              </Link>
            </div>
          ))}

          <div className={styles.box}>
            {footerData &&
              footerData.map((section) => (
                <div key={section.id} className={styles.card}>
                  <h2 className={styles.sub_heading}>{section.title}</h2>
                  {section.sub_links &&
                    section.sub_links.map((link) => (
                      <Link
                        key={link.id}
                        href={
                          link.url.includes('@')
                            ? `mailto:${link.url}`
                            : link.url
                        }
                      >
                        <p className={styles.content}>{link.title}</p>
                      </Link>
                    ))}
                </div>
              ))}

            <div className={styles.cardMobile}>
              {footerData &&
                footerData.map((section) => (
                  <div key={section.id}>
                    <h2 className={styles.sub_heading}>{section.title}</h2>
                    {section.sub_links &&
                      section.sub_links.map((link) => (
                        <div key={link.id} className={styles.sub_card_mobile}>
                          <Link
                            href={
                              link.url.includes('@')
                                ? `mailto:${link.url}`
                                : link.url
                            }
                          >
                            <p className={styles.content}>{link.title}</p>
                          </Link>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.line}></div>

          <div className={styles.box}>
            {footerSetting?.map((currentObject, index) => (
              <div key={index}>
                <p className={styles.content}>{currentObject?.copyright}</p>
              </div>
            ))}

            {footerSetting?.map((currentObject, index) => (
              <div className={styles.sub_card} key={index}>
                <Link href={currentObject?.develop_by_link}>
                  <p className={styles.content}>{currentObject?.devlop_by}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
export default Footer
