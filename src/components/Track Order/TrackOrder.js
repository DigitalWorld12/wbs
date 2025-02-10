// import * as React from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import styles from '../../../styles/TrackOrder.module.css'
import Image from 'next/image'
import Button from '@mui/material/Button'
import DataTable from './table'
import OrderCard from './PendingOrdersCard'
import FeaturedVideoSubBaner from '../slider/AddBaner'
import KnowMoreAboutOrder from './KnowMoreAboutOrder'
import PendingOrdersCard from './PendingOrdersCard'
import RejectedOrdersCard from './RejectedOrdersCard'
import ReviewedOrdersCard from './ReviewedOrdersCard'
import RetakeOrdersCard from './RetakeOrdersCard'
import CompletedOrdersCard from './CompletedOrdersCard'
import NoDataFound from '../NoData/noData'

import { useRouter } from 'next/router'
import { useState } from 'react'
import React, { useEffect } from 'react'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'

export default function TrackOrder() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter()
  const [orders, setOrders] = useState(null)
  const [isLoading, setIsLoading] = useState(true) // Add loading state

  useEffect(() => {
    getOrders()
  }, [])
  const getOrders = () => {
    axios
      .get(
        // Api?.GET_ORDERS
        `${baseURL}/api/user/get-orders`,

        {
          headers: {
            Authorization:
              'Bearer ' +
              reactLocalStorage?.getObject('loginAuth')?.authorisation?.token,
          },
        },
      )
      .then((response) => {
        setOrders(response.data.data)
        setIsLoading(false) // Set loading state to false when data is fetched
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          reactLocalStorage?.remove('loginAuth')
          router.push('/login')
        } else {
          console.error('Error: ', error)
        }
        setIsLoading(false)
      })
  }

  return (
    <div className={styles.Main_Container_Setting}>
      <h1 className={styles.Talent_Dashboard_TopHeading}>Orders</h1>
      {isLoading ? (
        <h1 style={{ color: '#fff' }}>Loading...</h1>
      ) : (
        <>
          {orders && (
            <>
              {orders.pending_orders.length > 0 ||
              orders.reject_orders.length > 0 ||
              orders.review.length > 0 ||
              orders.retake.length > 0 ||
              orders.complete_orders.length > 0 ? (
                <>
                  {orders?.pending_orders.length > 0 && <PendingOrdersCard />}
                  {orders?.reject_orders.length > 0 && <RejectedOrdersCard />}
                  {orders?.review.length > 0 && <ReviewedOrdersCard />}
                  {orders?.retake.length > 0 && <RetakeOrdersCard />}
                  {orders?.complete_orders.length > 0 && (
                    <CompletedOrdersCard />
                  )}
                </>
              ) : (
                <>
                  <NoDataFound />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
