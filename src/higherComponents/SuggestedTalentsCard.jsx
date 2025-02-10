/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import StarIcon from '@mui/icons-material/Star'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { Placeholder } from 'semantic-ui-react'

export default function SuggestedTalentsCard({ imgUrl, data, symbol }) {
  const value = 5
  const avgRating =
    data?.avg_ratting?.length > 0
      ? data?.avg_ratting[0]?.avg_rating.toFixed(1)
      : '3.5'

  return (
    <div className={styles.card}>
      <Image width={1000} height={1000} alt="" src={imgUrl || Placeholder} />
      <div className={styles.card_content}>
        <h2>{data?.name}</h2>

        <p>{data?.category?.name}</p>

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
    </div>
  )
}
