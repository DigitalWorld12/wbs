import React, { useRef, useState } from 'react'
import styles from '../../styles/Home.module.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StarIcon from '@mui/icons-material/Star'

export default function FeatureVideoCard({ imgUrl, data, symbol }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const avgRating =
    data?.avg_ratting?.length > 0
      ? data?.avg_ratting[0]?.avg_rating.toFixed(1)
      : '3.5'

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setPlaying(true)
    } else {
      videoRef.current.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  return (
    <div
      className={styles.video_parent}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        className={styles.Feature_video_card_video_width_height15}
        src={imgUrl}
        ref={videoRef}
        controls={false}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      ></video>

      <div className={styles.videos_content}>
        <div className={styles.video_content_child}>
          <p style={{ textTransform: 'uppercase' }}>
            {data?.artist?.nick_name}
          </p>
          <p>{data?.artist?.category?.name}</p>
          <br />
        </div>
        <div className={styles.flex}>
          <span>
            <StarIcon className={styles.rating_icon} />
            {avgRating}
          </span>
          <span className={styles.price}>
            {symbol ? symbol : ''}
            {data?.service_earning
              ? parseInt(data?.service_earning) >= 1000
                ? parseInt(data?.service_earning).toLocaleString()
                : data?.service_earning
              : '0'}
          </span>
        </div>
      </div>

      <button className={styles.play_button} onClick={togglePlay}>
        {playing ? (
          <PauseIcon className={styles.icon} />
        ) : (
          <PlayArrowIcon className={styles.icon} />
        )}
      </button>
    </div>
  )
}
