import React from 'react'

const noDataFound = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Please Place Some Order</h1>
    </div>
  )
}

export default noDataFound
