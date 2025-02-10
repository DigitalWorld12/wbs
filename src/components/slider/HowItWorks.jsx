import styles from '../../../styles/HowItWorks.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function HowItWorks() {
  return (
    <div className={styles.how_it_work_section}>
      <h1>how it work</h1>
      <div className={styles.how_it_work_section_sub}>
        <div>
          <Image
            src={require('../../../src/Asset/Images/Search_An_Star.png')}
            alt="Picture of the Search An Star"
          />
          <h3>Find a celebrity</h3>
          <p>Find the celeb for any occasion.</p>
        </div>
        <div>
          <Image
            src={require('../../../src/Asset/Images/Request_Them.png')}
            alt="Picture of the Search An Star"
          />
          <h3>Request Them</h3>
          <p>Get your personalized video message.</p>
        </div>
        <div>
          <Image
            src={require('../../../src/Asset/Images/Share_The_Wow.png')}
            alt="Picture of the Search An Star"
          />
          <h3>Share The Wow</h3>
          <p>Capture the WOW. Bonus points if you tag us.</p>
        </div>
      </div>
    </div>
  )
}
