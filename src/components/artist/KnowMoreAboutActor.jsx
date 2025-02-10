import * as React from 'react'
import { styled } from '@mui/material/styles'
import styles from '../../../styles/KnowMoreAboutActor.module.css'
import Typography from '@mui/joy/Typography'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import axios from 'axios'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#000000',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
}))
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}
export default function KnowMoreAboutActor({ data }) {
  const [faqs, setFaqs] = React.useState()
  const [faqsLoader, setFaqsLoader] = React.useState(false)

  React.useEffect(() => {
    getFAQS()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const getFAQS = async () => {
    let faqsSeqData = []
    await axios
      .get(
        `${baseURL}/api/faq-by-talent?category_id=${data?.category_id}`,

        process.env.NEXT_PUBLIC_BASE_URL +
          'api/faq-by-talent?category_id=' +
          data?.category_id,

        {},
      )
      .then(function (response) {
        response?.data?.data.map((faqs) => {
          data?.artist_answer.map((ans) => {
            if (ans?.faq_id === faqs?.id) {
              faqsSeqData?.push({ faqs, ans })
            }
            setFaqs(faqsSeqData)
            setFaqsLoader(true)
          })
        })
      })
      .catch(function (error) {})
  }
  return (
    <div className={styles.know_more_about_actor_main}>
      <div className={styles.know_more_about_actor_sub}>
        {faqsLoader && faqs.length > 0 ? (
          <>
            <div className={styles.know_more_about_actor_sec}>
              <h1>Know more about Actor {data && data?.name}</h1>
            </div>
            <div className={styles.know_more_about_actor_sec1}>
              <p style={{ textAlign: 'center' }}>
                Read frequently asked questions
              </p>
            </div>
          </>
        ) : (
          ''
        )}

        <div className={styles.know_more_about_actor_sec2}>
          {faqsLoader ? (
            <>
              {faqs?.map((item) => (
                <>
                  <Accordion className={styles.accordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className={styles.icon} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={styles.accordion_heading}>
                        {item?.faqs?.question_artist}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles.box_details}>
                      <Typography className={styles.box_pra}>
                        {item?.ans?.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </>
              ))}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
