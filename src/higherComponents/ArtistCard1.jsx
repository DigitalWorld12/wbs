/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import styles from '../../styles/Home.module.css'
import StarIcon from '@mui/icons-material/Star'

export default function ArtistCard1({ image, name, data, symbol }) {
  const avgRating =
    data?.avg_ratting?.length > 0
      ? data?.avg_ratting[0]?.avg_rating.toFixed(1)
      : '3.5'

  return (
    <div className={styles.card}>
      <img src={image || Placeholder} />
      <div className={styles.card_content}>
        <h2>{data ? data?.nick_name : 'Star Name'}</h2>
        <p>{data?.category?.name}</p>
      </div>
      <div className={styles.flex}>
        <span>
          <StarIcon className={styles.rating_icon} />
          {avgRating}
        </span>
        <span className={styles.price}>
          {symbol ? symbol : ''}
          {data?.service_charges[0]?.price
            ? parseInt(data?.service_charges[0]?.price) >= 1000
              ? parseInt(data?.service_charges[0]?.price).toLocaleString()
              : data?.service_charges[0]?.price
            : '0'}
        </span>
      </div>
    </div>
  )
}
