import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import styles from '../../../styles/PromoteBussiness.module.css'
import Button from '@mui/material/Button'
import { yellow } from '@mui/material/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Promote_Your_Bussiness() {
  const [selectedBudget, setSelectedBudget] = React.useState('')
  const handleBudgetClick = (budget) => {
    setSelectedBudget(budget)
  }
  const router = useRouter()
  const talentId = router.query.talent_id
  const isLocalStorageAvailable =
    typeof window !== 'undefined' && window.localStorage

  const initialTalentName = isLocalStorageAvailable
    ? localStorage.getItem('talentName') || router.query.talent_name || ''
    : router.query.talent_name || ''
  if (isLocalStorageAvailable && router.query.talent_name) {
    localStorage.setItem('talentName', router.query.talent_name)
  }

  const [talentName, setTalentName] = React.useState(initialTalentName)
  const updatedTalentName = (newValue) => {
    setTalentName(newValue)
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  return (
    <div className={styles.sub_parent}>
      <h2 className={styles.Lets_Heading}>Lets Get To Work</h2>
      <p className={styles.Develop_Paragraph}>
        Develop a plan with our marketing and events offerings, and level up
        your content’s quality and engagement.
      </p>

      <div className={styles.form_parent}>
        <div>
          <TextField
            sx={{
              input: {
                color: '#FFF',
                '&:focus': {
                  borderBottomColor: 'red',
                },
              },
            }}
            required
            id="standard-required"
            value={talentName}
            placeholder="Enter your full name"
            variant="standard"
            onChange={(e) => updatedTalentName(e.target.value)}
          />
          <TextField
            sx={{ input: { color: ' #FEFEFE' } }}
            required
            id="standard-required"
            placeholder="Enter your email address"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            sx={{ input: { color: ' #FEFEFE' } }}
            required
            id="standard-required"
            placeholder="Enter your phone number"
            variant="standard"
          />
          <TextField
            sx={{ input: { color: ' #FEFEFE' } }}
            required
            id="standard-required"
            placeholder="Company name"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            sx={{ input: { color: ' #FEFEFE' } }}
            required
            id="standard-required"
            placeholder="Number of emplyees"
            variant="standard"
          />
          <TextField
            sx={{ input: { color: ' #FEFEFE' } }}
            required
            id="standard-required"
            placeholder="Purpose of this activity?"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            sx={{ input: { color: ' #FEFEFE' } }}
            required
            id="standard-required"
            placeholder="Leave a message"
            variant="standard"
          />
        </div>
        <div className={styles.flex_wrap}>
          <span className={styles.budget}>What’s your budget ( in US )?</span>
          <Button
            className={`${styles.btn_Below} ${
              selectedBudget === 'Below 25k' && styles.active
            }`}
            variant="outlined"
            onClick={() => handleBudgetClick('Below 25k')}
          >
            Below 25k
          </Button>
          <Button
            className={`${styles.btn_Below} ${
              selectedBudget === '25k-100k' && styles.active
            }`}
            variant="outlined"
            onClick={() => handleBudgetClick('25k-100k')}
          >
            25k-100k
          </Button>
          <Button
            className={`${styles.btn_Below} ${
              selectedBudget === '100k+' && styles.active
            }`}
            variant="outlined"
            onClick={() => handleBudgetClick('100k+')}
          >
            100k+
          </Button>
          <Button
            className={`${styles.btn_Below} ${
              selectedBudget === 'Other' && styles.active
            }`}
            variant="outlined"
            onClick={() => handleBudgetClick('Other')}
          >
            Other
          </Button>
        </div>
        <div>
          <Checkbox {...label} defaultChecked />
          By submitting, you agree to receive marketing communications for
          Business
        </div>
        <div className={styles.btn_setting_center}>
          <Link href="/business_done">
            <Button className={styles.btn_Ask_For_Help} variant="outlined">
              Submit your business
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
