import Link from 'next/link'
import styles from '../../styles/Navigationbar.module.css'

import * as React from 'react'

import { useRouter } from 'next/router'
export default function Navigationbar() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <div className={styles.navbar_main}>
      <Link href="/">
        <button className={router.pathname === '/' ? styles.activeLink : ''}>
          Home
        </button>
      </Link>
      <Link href="/artist_categories">
        <button
          className={
            router.pathname === '/artist_categories' ? styles.activeLink : ''
          }
        >
          Categories
        </button>
      </Link>
      <Link href="/how_its_work">
        <button
          className={
            router.pathname === '/how_its_work' ? styles.activeLink : ''
          }
        >
          How It Works
        </button>
      </Link>
      <Link href="/promote_your_business">
        <button
          className={
            router.pathname === '/promote_your_business'
              ? styles.activeLink
              : ''
          }
        >
          For Business
        </button>
      </Link>
    </div>
  )
}
