import Image from 'next/image'
// import React from "react";

import loder from '../../Asset/loder1.gif'

import styles from '../../../styles/Home.module.css'

const Loders = () => {
  return (
    <div className={styles.gif_parent}>
      <Image
        className={styles.gif_img}
        alt="loder"
        src={loder}
        priority={true}
      />
    </div>
  )
}

export default Loders
