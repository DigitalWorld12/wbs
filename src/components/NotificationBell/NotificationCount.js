import { FaBell } from 'react-icons/fa'
import React from 'react'

const NotificationCounts = ({ notificationCounts }) => {
  return (
    <div style={{ position: 'relative' }}>
      {notificationCounts > 0 && (
        <div
          style={{
            width: '20px',
            height: '20px',
            marginLeft: '40px',
            backgroundColor: '#707070',
            color: 'white',
            borderRadius: '50%',
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {notificationCounts}
        </div>
      )}
    </div>
  )
}
export default NotificationCounts
