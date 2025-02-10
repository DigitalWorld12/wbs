import { useEffect, useState } from 'react'
import styles from '../../../styles/InnerBaner.module.css'
import 'react-multi-carousel/lib/styles.css'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Slider({ dataBanner, dataBaseUrl }) {
  const [muted, setMuted] = useState(true)
  const handleToggleMute = () => {
    setMuted((prevMuted) => !prevMuted)
  }

  return (
    <div className={styles.baner_container}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        className="mySwiper videoSwiper"
      >
        {dataBanner.length > 0 &&
          dataBanner?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.data_parent}>
                {item?.main_file_type == 'image' ? (
                  <Image
                    className={styles.img}
                    width={1000}
                    height={1000}
                    src={`${dataBaseUrl}${item?.main_file}`}
                    alt=""
                  />
                ) : (
                  <div className={styles.parent}>
                    <video
                      src={`${dataBaseUrl}${item?.main_file}`}
                      alt="Video"
                      controls={false}
                      playsInline
                      muted={muted}
                      autoPlay
                      loop
                    />

                    <div
                      className={styles.mute_button}
                      onClick={handleToggleMute}
                    >
                      {muted ? (
                        <VolumeOffIcon className={styles.icon} />
                      ) : (
                        <VolumeUpIcon className={styles.icon} />
                      )}
                    </div>
                  </div>
                )}
                {/* >>>>>>>>>>>>>  uper layer >>>>>>>>>>>>>>>> */}
                <div className={styles.content}>
                  <h1>{item?.title}</h1>

                  {item && item?.sub_image && (
                    <Image
                      src={`${dataBaseUrl}${item?.sub_image}`}
                      alt=""
                      width={1000}
                      height={1000}
                    />
                  )}

                  <p
                    dangerouslySetInnerHTML={{ __html: item?.slider_text }}
                    className={styles.banner_head}
                  ></p>
                  <div className={styles.btn_flex}>
                    <Link
                      href={item?.first_button_url}
                      className={`${styles.btn1} ${
                        item?.first_button_text ? styles.withPadding : ''
                      }`}
                    >
                      {item?.first_button_text}
                    </Link>
                    <Link
                      href={item?.first_button_url}
                      className={`${styles.btn2} ${
                        item?.second_button_text ? styles.withPadding : ''
                      }`}
                    >
                      {item?.second_button_text}
                    </Link>
                  </div>
                </div>

                {/* >>>>>>>>>>>>>  uper layer ennd>>>>>>>>>>>>>>>> */}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
