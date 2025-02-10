import { useState } from 'react'
import styles from '../../../styles/SideBar.module.css'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleSidebar() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button className={styles.openButton} onClick={toggleSidebar}>
        Sort By
      </button>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>

        <nav className={styles.nav}>
          <ul>
            <li>
              <button className={styles.closeButton} onClick={toggleSidebar}>
                {/* <CloseIcon /> */}
                Close
              </button>
            </li>
            <br />
            <li>
              <h2>Filter</h2>
            </li>
            <li className={styles.li}>
              <input type="checkbox" id="c1" />
              <label for="c1">Delivary</label>
            </li>
            <li className={styles.li}>
              <input type="checkbox" id="c2" />
              <label for="c2">24hr Delivary</label>
            </li>
            <li className={styles.li}>
              <input type="checkbox" id="c3" />
              <label for="c3">Standard Delivary</label>
            </li>
            <br />
            <li>
              <h2>Sort By</h2>
            </li>
            <li className={styles.li}>
              <input type="checkbox" id="c4" />
              <label for="c4">Popular</label>
            </li>
            <li className={styles.li}>
              <input type="checkbox" id="c5" />
              <label for="c5">Recommended</label>
            </li>
            <li className={styles.li}>
              <input type="checkbox" id="c6" />
              <label for="c6">Newest</label>
            </li>
            <li className={styles.li}>
              <input type="checkbox" id="c8" />
              <label for="c8">Alphabetical</label>
            </li>
            <br />
            <li>
              <h2>Price</h2>
            </li>
            <li className={styles.li}>
              <input type="checkbox" id="c9" />
              <label for="c9">$0-$100</label>
            </li>{' '}
            <li className={styles.li}>
              <input type="checkbox" id="c10" />
              <label for="c10">$100-$200</label>
            </li>{' '}
            <li className={styles.li}>
              <input type="checkbox" id="c11" />
              <label for="c11">$200-$400</label>
            </li>{' '}
            <li className={styles.li}>
              <input type="checkbox" id="c12" />
              <label for="c12">$400-$600</label>
            </li>{' '}
            <li className={styles.li}>
              <input type="checkbox" id="c13" />
              <label for="c13">$600+</label>
            </li>{' '}
            <br />
            <li>
              <h2>Reviews</h2>
            </li>
            <li className={styles.li}>
              <input type="checkbox" id="c14" />
              <label for="c14">4 Star To Up</label>
            </li>{' '}
            <li className={styles.li}>
              <input type="checkbox" id="c15" />
              <label for="c15">3 Star To Up</label>
            </li>{' '}
            <li className={styles.li}>
              <input type="checkbox" id="c16" />
              <label for="c16">2 Star To Up</label>
            </li>{' '}
            <li className={styles.li}>
              <input type="checkbox" id="c17" />
              <label for="c17">1 Star To Up</label>
            </li>{' '}
          </ul>
        </nav>
      </div>
    </>
  )
}
