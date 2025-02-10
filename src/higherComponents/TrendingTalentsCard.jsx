/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import StarIcon from '@mui/icons-material/Star'
import styles from '../../styles/Home.module.css'
import { Placeholder } from 'semantic-ui-react'

export default function TrendingTalentsCard({ imgUrl, data, symbol }) {
  const value = 5
  const [categories, setCategories] = React.useState({})

  const avgRating =
    data?.details[0]?.avg_ratting?.length > 0
      ? data?.details[0]?.avg_ratting?.[0]?.avg_rating.toFixed(1)
      : '3.5'

  return (
    <div className={styles.card}>
      <img src={imgUrl || Placeholder} />
      <div className={styles.card_content}>
        <h2>{data?.details[0]?.nick_name}</h2>

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
