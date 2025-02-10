/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import styles from '../../../styles/EditProfile.module.css'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'

import PhoneInput, { isValidPhoneNumber } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import localStorage from 'local-storage'
import { Suspense } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function EditProfileCard({ isArtist }) {
  const [localData, setLocalData] = useState(localStorage?.get('loginAuth'))

  // React Hooks
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const [name, setName] = useState(
    localData?.updated_data
      ? localData?.updated_data?.name
      : localData?.user?.name,
  )
  const [upToDate, setUpToDate] = useState(
    localData?.updated_data
      ? localData?.updated_data?.keep_up_to_date
      : localData?.user?.keep_up_to_date,
  )

  const [selectedFile, setSelectedFile] = useState(
    localData?.updated_data
      ? localData?.updated_data?.user_image
      : localData?.user?.user_image,
  )

  const [localImage, setLocalImage] = useState()
  const [click, setOnclick] = useState(false)
  const [keepUpToDateError, setKeepUpToDateError] = useState(false)

  const router = useRouter()
  useEffect(() => {
    setLocalData(localStorage?.get('loginAuth'))
    getLocalImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getLocalImage = async () => {
    if (localData !== null) {
      setLocalImage(
        localData?.updated_data
          ? localData?.updated_data?.user_image
          : localData?.user?.user_image,
      )
    } else {
    }
  }

  const EditData = async () => {
    setOnclick(true)
    //Check if the "Keep me up to date" checkbox is checked
    if (!upToDate) {
      setKeepUpToDateError(true)
      setOnclick(false)
      return
    }
    const token = localData?.authorisation?.token
    setLocalImage(
      localData?.updated_data
        ? localData?.updated_data?.user_image
        : localData?.user?.user_image,
    )
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('user_image', selectedFile)
    // formData.append("profile_image",      (x > 0) ? "Positive" : (x < 0) ? "Negative" : "Zero");
    formData.append('contact_number', phoneNumber)
    formData.append('is_online', 1)
    formData.append('keep_up_to_date', upToDate === true ? 1 : 0)
    try {
      const response = await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_BASE_URL + '/api/user/update',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer  ${token}`,
        },
      })
      if (response?.data?.status === true) {
        toast.success(
          response?.data?.message
            ? response?.data?.message
            : response?.data?.error,
        )
        updatedLocalStorage(response?.data?.data)
        setOnclick(false)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized')
        reactLocalStorage?.remove('loginAuth')
        router.push('/login')
      } else {
        toast.error(
          error?.response?.data?.errors?.contact_number
            ? error?.response?.data?.errors?.contact_number[0]
            : error?.response?.data?.errors?.user_image
            ? error?.response?.data?.errors?.user_image[0]
            : `${error?.response?.data?.message} please login again`,
        )
        setOnclick(false)
      }
    }
  }

  const updatedLocalStorage = async (data) => {
    let updated_data = { ...localData, updated_data: data }
    await localStorage?.set('loginAuth', updated_data)
    router.push('/')
  }

  const onSkip = () => {
    router.push('/')
  }

  const useImage =
    localData?.updated_data?.user_image || localData?.user?.user_image
  const [fileList, setFileList] = useState([
    {
      uid: '-1',

      name: useImage ? '6386976.png' : 'image.png',

      status: 'done',

      url: useImage
        ? `${baseURL}/${useImage}`
        : 'https://png.pngtree.com/png-clipart/20210606/original/pngtree-gray-avatar-placeholder-png-image_6398267.jpg',
    },
  ])

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    setSelectedFile(fileList[0]?.originFileObj)
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const [phoneNumber, setPhoneNumber] = useState(
    localData?.updated_data
      ? localData?.updated_data?.contact_number
      : localData?.user?.contact_number,
  )

  return (
    <div className={styles.edit_profile_card_main}>
      <ToastContainer className="tost" />

      <Suspense>
        <div className={styles.edit_profile_card_margintop_40}>
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </div>

        <div className={styles.edit_profile_card_main_width_90}>
          <h2>Your Name</h2>
          <input
            type="text"
            name="name"
            placeholder={'Your Name'}
            FormHelperTextProps={{ style: { color: 'white' } }}
            className={styles.edit_profile_card_input_field}
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>

        <div className={styles.edit_profile_card_main_width_90}>
          <h2>Contact No</h2>
          <PhoneInput
            className={styles.p_number}
            placeholder="Enter phone number"
            withCountryCallingCode
            value={phoneNumber}
            defaultCountry="PK"
            minLength={10}
            maxLength={15}
            country="us"
            onChange={setPhoneNumber}
            inputStyle={{
              background: 'lightblue',
            }}
          />
        </div>

        <div className={styles.edit_profile_card_set_alignment}>
          <FormControlLabel
            className={styles.edit_profile_card_form_control_label}
            control={
              <Checkbox
                labelStyle={{ color: 'white' }}
                inputStyle={{ color: 'white' }}
                className={styles.edit_profile_card_checkbox}
                Checkbox={true}
                defaultChecked={upToDate}
                onChange={(e) => {
                  setUpToDate(e.target.checked)
                  setKeepUpToDateError(false) // Clear the error when the checkbox is clicked
                }}
              />
            }
            label="Keep me upto date"
          />

          {keepUpToDateError && (
            <div style={{ color: 'red' }}>
              Please check this box to continue.
            </div>
          )}
        </div>
        <Box
          sx={{
            display: click ? 'flex' : 'none',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <CircularProgress />
        </Box>
        <button
          className={styles.edit_profile_card_button}
          style={{
            display: click ? 'none' : '',
          }}
          onClick={EditData}
        >
          Confirm
        </button>

        <button
          className={styles.edit_profile_card_button}
          style={{
            display: click ? 'none' : '',
          }}
          onClick={onSkip}
        >
          Skip
        </button>
      </Suspense>
    </div>
  )
}
export default EditProfileCard
