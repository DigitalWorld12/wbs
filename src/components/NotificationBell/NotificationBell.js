import { FaBell } from 'react-icons/fa'
import React from 'react'

const NotificationBell = ({ notificationCount }) => {
  return (
    <div style={{ position: 'relative' }}>
      <FaBell style={{ color: '#cea234' }} size={30} />
      {notificationCount > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            width: '20px',
            height: '20px',
            backgroundColor: '#707070',
            color: 'white',
            borderRadius: '50%',
            fontSize: '18px',
          }}
        >
          {notificationCount}
        </div>
      )}
    </div>
  )
}

export default NotificationBell
