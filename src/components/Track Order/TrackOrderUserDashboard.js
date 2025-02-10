import * as React from 'react'
import styles from '../../../styles/TrackOrder.module.css'
import PendingOrdersCardUserDashboard from './PendingOrdersCardUserDashboard'
import CompletedOrdersCardUserDashboard from './CompletedOrdersCardUserDashboard'

export default function TrackOrderUserDashboard() {
  return (
    <div className={styles.Main_Container_Setting}>
      <h1 className={styles.Talent_Dashboard_TopHeading}>Orders</h1>

      <PendingOrdersCardUserDashboard />

      <CompletedOrdersCardUserDashboard />
    </div>
  )
}
