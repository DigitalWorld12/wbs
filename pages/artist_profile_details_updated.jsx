/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import styles from '../styles/EditProfile.module.css'
import React from 'react'
import Image from 'next/image'
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons'
import Footer from '../src/components/footer/Footer'
import Topbar from '../src/components/topbar/Topbar'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

import { useSelector, useDispatch } from 'react-redux'

import { reactLocalStorage } from 'reactjs-localstorage'
import { useRouter } from 'next/router'

import dayjs from 'dayjs'

import Stack from '@mui/material/Stack'

import localStorage from 'local-storage'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Chip from '@mui/material/Chip'
import dynamic from 'next/dynamic'

const ImgCrop = dynamic(() => import('antd-img-crop'), { ssr: false })
import { Upload } from 'antd'

function artist_profile_details_updated() {
  useEffect(() => {
    getArtistData()

    const data = reactLocalStorage.getObject('loginAuth')
    if (Object.keys(data).length === 0) {
      router.push('/login')
    }
  }, [])
  // ---------------------------------------
  const [localData, setLocalData] = useState(localStorage?.get('loginAuth'))
  const [localArtistData, setLocalArtistData] = useState(
    localStorage?.get('isArtist'),
  )

  const [updatedData, setUpdatedData] = useState(null)

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const [selectedFile, setSelectedFile] = useState(
    localData?.updated_data
      ? localData?.updated_data?.profile_image
      : localData?.data?.profile_image,
  )

  const [click, setOnclick] = useState(false)

  const router = useRouter()

  const EditData = async () => {
    const data = reactLocalStorage.getObject('loginAuth')
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    const userId = data?.user?.id
    setOnclick(true)

    const token = localData?.authorisation?.token

    if (event) {
      event.preventDefault()
    }

    const formData = new FormData()
    formData.append('artist_id', artistId)
    formData.append('user_id', userId)
    formData.append('nick_name', nickName)
    formData.append('profile_image', selectedFile)
    formData.append('category', category?.name)
    formData.append('categoryId', category?.id)
    formData.append('brief_your_talent', bio)
    formData.append('DOB', date)

    chips.forEach((tag) => {
      formData.append('tags[]', tag)
    })
    formData.append('twitter', socialMedia?.tw)
    formData.append('facebook', socialMedia?.fb)
    formData.append('instagram', socialMedia?.inst)
    formData.append('Zodiac_sign', 'none')

    try {
      const response = await axios({
        method: 'post',

        url: process.env.NEXT_PUBLIC_BASE_URL + '/api/artist/update',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer  ${token}`,
        },
      })
      if (response?.data?.status === true) {
        setUpdatedData(response?.data)
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
            : error?.response?.data?.errors?.profile_image
            ? error?.response?.data?.errors?.profile_image[0]
            : `${error?.response?.data?.message} please login again`,
        )
        setOnclick(false)
      }
    }
  }

  const updatedLocalStorage = async (data) => {
    let updated_data = { ...localData, updated_data: data }
    await localStorage?.set('loginAuth', updated_data)
  }

  const [fileList, setFileList] = useState([])

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

  // -----------------------------------------

  const [date, setDate] = useState()
  const [category, setCategory] = React.useState({})
  const [nickName, setNickname] = useState('')
  const [bio, setBio] = useState('')
  const [categoryList, setCategoryList] = React.useState()
  const [FAQS, setFAQS] = useState()
  const [FAQSAnswer, setFAQSAnswer] = useState([])
  const [value, setValue] = useState('')
  const [socialMedia, setSocialMedia] = useState({ fb: '', tw: '', inst: '' })
  const [isValidTwitterLink, setIsValidTwitterLink] = useState(true)
  const [isValidFacebookLink, setIsValidFacebookLink] = useState(true)
  const [isValidInstagramLink, setIsValidInstagramLink] = useState(true)
  const [chips, setChips] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleAddChip = () => {
    if (inputValue.trim() !== '') {
      setChips([...chips, inputValue])
      setInputValue('')
    }
  }

  const handleDeleteChip = (chipToDelete) => {
    setChips(chips.filter((chip) => chip !== chipToDelete))
  }
  const handleTwitterInputChange = (e) => {
    const inputValue = e.target.value.trim()

    const twitterUrlPattern = /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/
    setSocialMedia((prev) => ({ ...prev, tw: inputValue }))

    if (twitterUrlPattern.test(inputValue)) {
      setIsValidTwitterLink(true)
    } else {
      setIsValidTwitterLink(false)
    }
  }

  const handleFacebookInputChange = (e) => {
    const inputValue = e.target.value.trim()
    const facebookUrlPattern = /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.-]+(\?[^/]+)?$/

    setSocialMedia((prev) => ({ ...prev, fb: inputValue }))

    if (facebookUrlPattern.test(inputValue)) {
      setIsValidFacebookLink(true)
    } else {
      setIsValidFacebookLink(false)
    }
  }

  const handleInstagramInputChange = (e) => {
    const inputValue = e.target.value.trim()
    const instagramProfilePattern = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/
    setSocialMedia((prev) => ({ ...prev, inst: inputValue }))

    if (instagramProfilePattern.test(inputValue)) {
      setIsValidInstagramLink(true)
    } else {
      setIsValidInstagramLink(false)
    }
  }
  const [fields, setFields] = useState([])

  const [newImage, setNewImage] = useState(null)

  const handleChange1 = (index, event, item) => {
    const newFAQSAnswer = [...AnswerOfCategoryQuestion]
    const updatedFAQ = {
      ...AnswerOfCategoryQuestion[index], // Copy the existing FAQ object
      questionId: item.questionId, // Set questionId to item.id
      answer: event.target.value, // Update the answer
    }

    newFAQSAnswer[index] = updatedFAQ

    setAnswerOfCategoryQuestion(newFAQSAnswer)
  }

  const getArtistData = async () => {
    try {
      const data = reactLocalStorage.getObject('loginAuth')
      const token = data?.authorisation?.token
      const artistdata = reactLocalStorage.getObject('isArtist')
      const artistId = artistdata?.data?.id
      const userId = data?.user?.id
      if (!token) {
        router.push('/login')
        return
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?user_id=${userId}&artist_id=${artistId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setNickname(response?.data?.data?.nick_name)
      setSocialMedia((prev) => ({
        ...prev,
        tw: response?.data?.data?.twitter,
      }))
      setSocialMedia((prev) => ({
        ...prev,
        fb: response?.data?.data?.facebook,
      }))
      setSocialMedia((prev) => ({
        ...prev,
        inst: response?.data?.data?.instagram,
      }))
      setCategory({
        id: response?.data?.data?.category?.id,
        name: response?.data?.data?.category?.name,
      })

      const initialDOB = response?.data?.data?.dob
      setValue(initialDOB ? dayjs(initialDOB) : '')
      setDate(initialDOB)
      setBio(response?.data?.data?.bio)
      setFAQSAnswer(response?.data?.data?.faq)
      setChips(response?.data?.data?.tags)

      const profileImageURL = response?.data?.data?.profile_image
      setFileList([
        {
          uid: '-1',
          name: profileImageURL ? 'profile_image.png' : 'image.png',
          status: 'done',
          url: profileImageURL
            ? `${baseURL}/${profileImageURL}`
            : 'https://png.pngtree.com/png-clipart/20210606/original/pngtree-gray-avatar-placeholder-png-image_6398267.jpg',
        },
      ])
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === 'Token has expired'
      ) {
        window.location.href = '/login'
      } else {
        console.error('Error:', error)
      }
    }
  }

  const count = useSelector((state) => state?.counter)
  const handleChange = (event) => {
    setFields([])
    setCategory(event.target.value)
  }

  function isValidDate(dateString) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    return datePattern.test(dateString)
  }

  const dateHandler = (event) => {
    const selectedDate = event.target.value

    if (isValidDate(selectedDate)) {
      if (
        dayjs(selectedDate).format('YYYY-MM-DD') !== value?.format('YYYY-MM-DD')
      ) {
        setValue(dayjs(selectedDate))
        setDate(selectedDate)
      }
    } else {
    }
  }

  const addRegistration = async () => {
    setOnclick(true)
    const data = reactLocalStorage.getObject('loginAuth')
    const token = data?.authorisation?.token
    const artistdata = reactLocalStorage.getObject('isArtist')
    const artistId = artistdata?.data?.id
    const user_id = data?.user?.id

    if (data !== '' && data?.user?.user_type === 'user') {
      await axios
        .post(
          `${baseURL}/api/artist/update`,

          {
            artist_id: artistId,
            user_id: user_id,
            nick_name: nickName,
            brief_your_talent: bio,
            DOB: date,
            twitter: socialMedia?.tw,
            facebook: socialMedia?.fb,
            instagram: socialMedia?.inst,
            tags: chips,

            Zodiac_sign: 'none',
            AnswerOfCategoryQuestion: AnswerOfCategoryQuestion, // Set AnswerOfCategoryQuestion to the mapped FAQSAnswer
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(function (response) {
          if (response?.data?.status === true) {
            toast.success(response?.data?.message)
          } else if (response?.data?.message) {
            toast.warn(response?.data?.message)
          } else {
            console.error('Unexpected response:', response)
          }
          setOnclick(false)
        })
        .catch(function (error) {
          setOnclick(false)
          toast.error(
            error?.response?.data?.errors?.DOB
              ? error?.response?.data?.errors?.DOB[0]
              : error?.response?.data?.errors?.tags
              ? error?.response?.data?.errors?.tags[0]
              : error?.response?.data?.errors?.brief_your_talent
              ? error?.response?.data?.errors?.brief_your_talent[0]
              : error?.response?.data?.errors?.categoryId
              ? error?.response?.data?.errors?.categoryId[0]
              : error?.response?.data?.errors?.brief_your_talent
              ? error?.response?.data?.errors?.brief_your_talent[0]
              : error?.response?.data?.errors?.nick_name
              ? error?.response?.data?.errors?.nick_name[0]
              : error?.response?.data?.errors?.profile_image
              ? `${error?.response?.data?.errors?.profile_image[0]} Please goto edit user profile and add profile Image`
              : `${error?.response?.data?.message} please login again`,
          )
        })
    }

    if (
      (data !== '' && data?.user?.user_type === 'artist') ||
      data?.user?.user_type === 'agency'
    ) {
      await axios
        .post(
          `${baseURL}/api/artist/update`,

          {
            artist_id: artistId,
            user_id: user_id,
            nick_name: nickName,
            category: category?.name,
            categoryId: category?.id,
            brief_your_talent: bio,
            DOB: date,
            tags: chips,
            twitter: socialMedia?.tw,
            facebook: socialMedia?.fb,
            instagram: socialMedia?.inst,
            Zodiac_sign: 'none',
            AnswerOfCategoryQuestion: AnswerOfCategoryQuestion,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(function (response) {
          if (response?.data?.status === true) {
            toast.success(`${response?.data?.message}`)
          }
          setOnclick(false)
        })
        .catch(function (error) {
          setOnclick(false)
          toast.error(
            error?.response?.data?.errors?.DOB
              ? error?.response?.data?.errors?.DOB[0]
              : error?.response?.data?.errors?.tags
              ? error?.response?.data?.errors?.tags[0]
              : error?.response?.data?.errors?.brief_your_talent
              ? error?.response?.data?.errors?.brief_your_talent[0]
              : error?.response?.data?.errors?.categoryId
              ? error?.response?.data?.errors?.categoryId[0]
              : error?.response?.data?.errors?.brief_your_talent
              ? error?.response?.data?.errors?.brief_your_talent[0]
              : error?.response?.data?.errors?.nick_name
              ? error?.response?.data?.errors?.nick_name[0]
              : error?.response?.data?.errors?.profile_image
              ? error?.response?.data?.errors?.profile_image[0]
              : `${error?.response?.data?.message} please login again`,
          )
        })
    }
  }
  const [preview, setPreview] = useState('')
  const [localImage, setLocalImage] = useState('')
  const UploadImage = (e) => {
    setNewImage(e.target.files[0])
    if (e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0])
      setPreview(imageUrl)
    }
  }
  const [AnswerOfCategoryQuestion, setAnswerOfCategoryQuestion] = useState([])

  useEffect(() => {
    const newAnswerOfCategoryQuestion = FAQSAnswer.map((item) => ({
      questionId: item.id, // Change 'id' to 'questionId'
      answer: item.answer,
      category_id: item.category_id,
      question_artist: item.question_artist,
    }))

    setAnswerOfCategoryQuestion(newAnswerOfCategoryQuestion)
  }, [FAQSAnswer])
  return (
    <>
      <div className={styles.container}>
        <Topbar />
        <ToastContainer className="tost" />

        <div className={styles.edit_profile_card_width_90}></div>

        <h1 className={styles.edit_profile_card_heading}>
          EDIT TALENT PROFILE DETAILS
        </h1>

        <div className={styles.edit_profile_card_width_50}>
          <div className={styles.edit_profile_card_margintop_40}>
            <ImgCrop>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={(info) => {
                  onChange(info)
                  EditData()
                }}
                onPreview={onPreview}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </div>
          <div className={styles.artist_profile_details_width_90}>
            <h2>Do you have any nick name as well? if yes,please type</h2>
            <input
              type="text"
              name="name"
              placeholder={'Any Name'}
              FormHelperTextProps={{ style: { color: 'white' } }}
              className={styles.artist_profile_details_input_field}
              value={nickName}
              onChange={(e) => {
                setNickname(e.target.value)
              }}
            />
          </div>

          <div className={styles.artist_profile_details_width_90}>
            <h2>Which category do you want us to add your talent?</h2>

            <input
              type="text"
              name="name"
              placeholder={'Category'}
              FormHelperTextProps={{ style: { color: 'white' } }}
              className={styles.artist_profile_details_input_field}
              value={category?.name}
            />
          </div>

          <div className={styles.artist_profile_details_width_90}>
            <h2>Small Brief about your talent</h2>

            <textarea
              placeholder={'Description about yout talent'}
              className={styles.artist_profile_details_input_textarea}
              value={bio}
              onChange={(e) => {
                const text = e.target.value
                if (text.length <= 500) {
                  setBio(text)
                }
              }}
            />
            <p style={{ color: 'white' }}>
              Character Count: {bio?.length} / 500
              <br />
            </p>
          </div>
          <div className={styles.artist_profile_details_width_90}>
            <h2>Tags</h2>
            <div className={styles.artist_profile_details_parent_input_field}>
              <TextField
                style={{ color: '#fff', height: '45px', width: '100%' }}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={'Tags'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddChip()
                  }
                }}
              />
              <button onClick={handleAddChip}>Add</button>
            </div>
            <Stack
              direction="row"
              spacing={1}
              marginTop={2}
              className={styles.tag_parent}
            >
              {chips?.map((chip, index) => (
                <Chip
                  style={{ color: '#fff', background: '#b38206', margin: '0' }}
                  key={index}
                  label={chip}
                  onDelete={() => handleDeleteChip(chip)}
                />
              ))}
            </Stack>
          </div>
          <div className={styles.artist_profile_details_width_90}>
            <h2>Few Question we like to know more about your</h2>
            <h2>When was you born?</h2>

            <input
              type="date"
              name="date"
              placeholder={'DD/MM/YYYY'}
              FormHelperTextProps={{ style: { color: 'white' } }}
              className={styles.artist_profile_details_input_field}
              value={value?.format ? value.format('YYYY-MM-DD') : value || ''} // Format date for input value
              onChange={dateHandler}
            />
          </div>

          <div className={styles.artist_profile_details_width_90}>
            <h2>Social Media Profile</h2>
            <input
              type="text"
              name="twitter"
              placeholder={'https://twitter.com/profile_name'}
              FormHelperTextProps={{ style: { color: 'white' } }}
              className={styles.artist_profile_details_input_field}
              value={socialMedia?.tw} // mandatory
              onChange={handleTwitterInputChange}
            />
            {!isValidTwitterLink && (
              <p style={{ color: 'red' }}>
                Invalid Twitter link. Please enter a valid Twitter URL.
              </p>
            )}
            <div className={styles.artist_profile_details_height_20}></div>
            <input
              type="text"
              name="facebook"
              placeholder={'https://www.facebook.com/profile.name'}
              FormHelperTextProps={{ style: { color: 'white' } }}
              className={styles.artist_profile_details_input_field}
              value={socialMedia?.fb} // mandatory
              onChange={handleFacebookInputChange}
            />
            {!isValidFacebookLink && (
              <span style={{ color: 'red' }}>Invalid Facebook link</span>
            )}
            <div className={styles.artist_profile_details_height_20}></div>
            <input
              type="text"
              name="instagram"
              placeholder={'https://www.instagram.com/profilename'}
              FormHelperTextProps={{ style: { color: 'white' } }}
              className={styles.artist_profile_details_input_field}
              value={socialMedia?.inst} // mandatory
              onChange={handleInstagramInputChange}
            />
            {!isValidInstagramLink && (
              <span style={{ color: 'red' }}>
                Invalid Instagram profile link
              </span>
            )}
          </div>

          <div className={styles.artist_profile_details_width_90}>
            {AnswerOfCategoryQuestion &&
              AnswerOfCategoryQuestion?.map((item, index) => (
                <div key={item?.id}>
                  <h2>{item?.question_artist}</h2>
                  <input
                    type="text"
                    name="Answer"
                    placeholder={'Answer'}
                    FormHelperTextProps={{ style: { color: 'white' } }}
                    className={styles.artist_profile_details_input_field}
                    value={AnswerOfCategoryQuestion[index]?.answer || ''} // Use FAQSAnswer[index]?.answer
                    onChange={(event) => handleChange1(index, event, item)}
                  />
                </div>
              ))}
          </div>
          <Box sx={{ display: click ? 'flex' : 'none', marginBottom: 10 }}>
            <CircularProgress />
          </Box>
          <button
            className={styles.artist_profile_details_button}
            style={{
              display: click ? 'none' : '',
            }}
            onClick={addRegistration}
          >
            Save Changes
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default artist_profile_details_updated
