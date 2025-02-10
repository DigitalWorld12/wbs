/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import styles from '../../styles/Home.module.css'
import { Placeholder } from 'semantic-ui-react'
import StarIcon from '@mui/icons-material/Star'

export default function FeatureArtistCard1({
  imgUrl,
  name,
  price,
  category,
  rating,
  symbol,
  artistImg,
  onChildClick,
}) {
  const avgRating =
    rating?.length > 0 ? rating[0]?.avg_rating.toFixed(1) : '3.5'

  return (
    <div onClick={onChildClick}>
      <div className={styles.card1}>
        <img src={artistImg || imgUrl || Placeholder} />
        <div className={styles.card_content}>
          <h2> {name ? name : 'Star Name'}</h2>
          <p>{category ? category : ''}</p>
        </div>
        <div className={styles.flex}>
          <span>
            <StarIcon className={styles.rating_icon} />
            {avgRating}
          </span>
          <span className={styles.price}>
            {symbol ? symbol : ''}
            {price
              ? parseInt(price) >= 1000
                ? parseInt(price).toLocaleString()
                : price
              : '0'}
          </span>
        </div>
      </div>
    </div>
  )
}
