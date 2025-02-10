import * as React from 'react'
import { styled } from '@mui/material/styles'
import styles from '../../../styles/KnowMoreAboutActor.module.css'
import Typography from '@mui/joy/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function KnowMoreAboutOrder() {
  return (
    <div className={styles.know_more_about_actor_main}>
      <div className={styles.know_more_about_actor_sub}>
        <div className={styles.know_more_about_actor_sec}>
          <h1>Know more about Actor</h1>
        </div>
        <div className={styles.know_more_about_actor_sec1}>
          <p style={{ textAlign: 'center' }}>Read frequently asked questions</p>
        </div>

        <div className={styles.know_more_about_actor_sec2}>
          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Praesentium, maiores.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
                soluta nostrum numquam reiciendis modi. Ipsum rem animi
                similique consectetur accusantium at officiis, nostrum neque
                incidunt. Vero optio totam reprehenderit? Earum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Praesentium, maiores.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
                soluta nostrum numquam reiciendis modi. Ipsum rem animi
                similique consectetur accusantium at officiis, nostrum neque
                incidunt. Vero optio totam reprehenderit? Earum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Praesentium, maiores.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
                soluta nostrum numquam reiciendis modi. Ipsum rem animi
                similique consectetur accusantium at officiis, nostrum neque
                incidunt. Vero optio totam reprehenderit? Earum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Praesentium, maiores.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
                soluta nostrum numquam reiciendis modi. Ipsum rem animi
                similique consectetur accusantium at officiis, nostrum neque
                incidunt. Vero optio totam reprehenderit? Earum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Praesentium, maiores.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
                soluta nostrum numquam reiciendis modi. Ipsum rem animi
                similique consectetur accusantium at officiis, nostrum neque
                incidunt. Vero optio totam reprehenderit? Earum.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
