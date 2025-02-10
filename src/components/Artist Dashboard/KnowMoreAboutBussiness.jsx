// import * as React from "react";
import { styled } from '@mui/material/styles'
import styles from '../../../styles/KnowMoreAboutActor.module.css'
import Typography from '@mui/joy/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function KnowMoreAboutBussiness() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    axios
      .get(`${baseURL}/api/faq-by-category?category_id=4`)
      .then(function (response) {
        if (response?.data?.status === true) {
          setData(response.data?.data)
          setIsLoading(false)
        }
      })
      .catch(function (error) {
        console.error('Error: ', error)
        setIsLoading(false)
      })
  }, [])
  return (
    <div className={styles.know_more_about_actor_main}>
      {!isLoading && data.length > 0 ? (
        <div className={styles.know_more_about_actor_sub}>
          <div className={styles.know_more_about_actor_sec}>
            <h1>KNOW MORE ABOUT {data[0]?.category?.name}</h1>
          </div>
          <div className={styles.know_more_about_actor_sec1}>
            <p style={{ textAlign: 'center' }}>
              Read frequently asked questions
            </p>
          </div>

          <div className={styles.know_more_about_actor_sec2}>
            {data?.map((item) => (
              <>
                <Accordion className={styles.accordion} key={item.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={styles.icon} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={styles.accordion_heading}>
                      {item?.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={styles.box_details}>
                    <Typography className={styles.box_pra}>
                      {item?.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
