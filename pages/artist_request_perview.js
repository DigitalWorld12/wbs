/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import styles from '../styles/ArtistRequest.module.css'
import React, { useEffect, useRef, useState } from 'react'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import SelectOccasion from '../src/components/artist/SelectOccasion'
import ArtistMessage from '../src/components/artist/ArtistMessage'
import DetailInformation from '../src/components/artist/DetailInformation'
import ArtistAvatar from '../src/components/artist/ArtistAvatar'
import { useRouter } from 'next/router'
import { reactLocalStorage } from 'reactjs-localstorage'
import localStorage from 'local-storage'

import Private from '../src/components/artist/Private'
import ArtistMessagePreview from '@/components/artist/ArtistMessagePreview'
import DetailInformationPreview from '@/components/artist/DetailInformationPreview'
import SelectOccasionPreview from '@/components/artist/SelectOccasionPreview'
import ArtistAvatarPreview from '@/components/artist/ArtistAvatarPreview'
function artist_request() {
  const router = useRouter()
  useEffect(() => {
    const data = reactLocalStorage.getObject('loginAuth')
    if (Object.keys(data).length === 0) {
      router.push('/login')
    }
  }, [])
  const { talent_id, service_id, service_charges, talent_name } = router.query
  const { cardData } = router.query
  const cardDataObject = cardData ? JSON.parse(cardData) : null

  const userid = localStorage.get('loginAuth')?.user?.id

  const [orderData, setOrderData] = useState({
    artist_id: '',
    artist_name: '',
    artist_service_charge_id: service_id,
    occasion_id: '',
    send_type: 'someone',
    to: '',
    from: '',
    message: '',
    user_id: userid,
    delivery_date: '',
    pronoun_to: '',
    pronoun_from: '',
    promo_code: '',
    service_charges: '',
    is_private: '',
  })
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) {
      if (cardDataObject && cardDataObject.to !== orderData.to) {
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          to: cardDataObject.to || '',
          message: cardDataObject.message || '',
          service_charges: cardDataObject.service_earning || '',
          artist_name: cardDataObject.artist.nick_name || '',
          artist_id: cardDataObject.artist.artist_id || '',
          pronoun_to: cardDataObject.pronoun_to,
          pronoun_from: cardDataObject.pronoun_from || '',
          occasion_id: cardDataObject.occasion_id || '',
          promo_code: cardDataObject.promo_code || '',
        }))
      }
    } else {
      didMountRef.current = true
    }
  }, [cardDataObject, orderData])

  const [message, setMessage] = useState()
  const inputHandler = (e) => {
    const { name, value } = e.target
    setOrderData({
      ...orderData,
      [name]: value,
    })
  }
  useEffect(() => {
    setOrderData({ ...orderData, message: message })
  }, [message])
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <h1 className={styles.Heading_Request_Artist_Name}>
          New Request For {orderData?.artist_name}
        </h1>
        <div className={styles.Main_Container_Setting}>
          <div className={styles.First_Name_Container}>
            <h2 className={styles.To_First_Name_Heading}>To ( First Name )</h2>
            <input
              type="text"
              name="to"
              value={cardDataObject?.to}
              placeholder={'Any Name'}
              FormHelperTextProps={{ style: { color: 'white' } }}
              className={styles.To_First_Name_InputField}
            />

            <Stack
              spacing={2}
              direction="row"
              className={styles.artist_request_stack}
            >
              <Button
                className={styles.btn_tags_option}
                variant={
                  orderData.pronoun_to === 'He/Him' ? 'contained' : 'outlined'
                }
              >
                He/Him
              </Button>
              <Button
                className={styles.btn_tags_option}
                variant={
                  orderData.pronoun_to === 'She/Her' ? 'contained' : 'outlined'
                }
              >
                She/Her
              </Button>
              <Button
                className={styles.btn_tags_option}
                variant={
                  orderData.pronoun_to === 'They/Them'
                    ? 'contained'
                    : 'outlined'
                }
              >
                They/Them
              </Button>
            </Stack>
          </div>

          <div className={styles.First_Name_Container}>
            <h2 className={styles.From_First_Name}>From ( First Name )</h2>
            <input
              type="text"
              name="from"
              placeholder={'Huzaifa'}
              value={cardDataObject?.from}
              FormHelperTextProps={{ style: { color: 'white' } }}
              className={styles.To_First_Name_InputField}
            />
            <Stack
              spacing={2}
              direction="row"
              className={styles.artist_request_stack}
            >
              <Button
                className={styles.btn_tags_option}
                variant={
                  orderData.pronoun_from === 'He/Him' ? 'contained' : 'outlined'
                }
              >
                He/Him
              </Button>
              <Button
                className={styles.btn_tags_option}
                variant={
                  orderData.pronoun_from === 'She/Her'
                    ? 'contained'
                    : 'outlined'
                }
              >
                She/Her
              </Button>
              <Button
                className={styles.btn_tags_option}
                variant={
                  orderData.pronoun_from === 'They/Them'
                    ? 'contained'
                    : 'outlined'
                }
              >
                They/Them
              </Button>
            </Stack>
          </div>

          <div className={styles.Date_Container}>
            <div>
              <h2 className={styles.From_First_Name}>Delivery Date</h2>
              <input
                type="date"
                name="delivery_date"
                value={cardDataObject?.delivery_date}
                FormHelperTextProps={{ style: { color: 'white' } }}
                className={styles.To_First_Name_InputField1}
              />
            </div>
          </div>

          <div className={styles.artist_occasion}>
            <SelectOccasionPreview
              setOrderData={setOrderData}
              orderData={orderData}
            />
          </div>

          <div className={styles.artist_detail_information}>
            <DetailInformationPreview
              setMessage={setMessage}
              orderData={orderData}
              service_charges={service_charges}
            />
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  )
}
export default artist_request
