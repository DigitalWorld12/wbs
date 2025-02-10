import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import { Api } from '../src/config/Config'

function ReviewOrder() {
  const router = useRouter()
  const { order_id, order_video } = router.query
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState()
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const handleCompleteOrder = () => {
    axios
      .post(
        // Api?.COMPLETE_ORDER,
        `${baseURL}/api/user/order-complete`,

        {
          order_id: order_id,
        },
        {
          headers: {
            Authorization:
              'Bearer ' +
              reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
          },
        },
      )
      .then((response) => {
        // console.log(response)
        router.push('/track_my_order')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleRetake = () => {
    axios
      .post(
        // Api?.RETAKE_ORDER,
        `${baseURL}/api/user/order-retake`,

        {
          order_id: order_id,
          reason: reason,
        },
        {
          headers: {
            Authorization:
              'Bearer ' +
              reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
          },
        },
      )
      .then((response) => {
        router.push('/track_my_order')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <video
        style={{
          borderRadius: '10px',
          boxShadow: 'revert',
          width: '50rem',
          height: '15rem',
        }}
        src={` ${baseURL}/${order_video}`}
        controls
      ></video>
      <div>
        <button onClick={handleCompleteOrder}>Complete Order</button>
        <button
          onClick={() => {
            setOpen(!open)
          }}
        >
          Retake Order
        </button>
        {open && (
          <>
            <h3>Reason :</h3>
            <input onChange={(e) => setReason(e.target.value)} />
            <button onClick={handleRetake}>Submit</button>
          </>
        )}
      </div>
    </div>
  )
}

export default ReviewOrder
