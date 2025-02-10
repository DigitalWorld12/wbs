import styles from '../styles/TermAndCondition.module.css'
import Image from 'next/image'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Footer from '../src/components/footer/Footer'
import Divider from '@mui/material/Divider'
import Topbar from '../src/components/topbar/Topbar'

const artist_term_and_condition = () => {
  return (
    <>
      <div className={styles.container}>
        <Grid container xs={12}>
          <Grid item xs={12} md={12}>
            <Topbar />

            <Divider color={'white'} variant="middle" />
            <div className={styles.user_privacy_policy_setheight}></div>
            <div className={styles.main}>
              <h1 className={styles.heading}>TERMS & CONDITION</h1>

              <p className={styles.txt}>
                Lorem ipsum dolor sit amet. Sit officiis possimus est dolorum
                corrupti ut quos vero. Sed iusto enim ut perspiciatis numquam ut
                deserunt asperiores ut rerum optio sit expedita nisi eum autem
                voluptas et expedita molestiae. Et consectetur quia ut
                asperiores natus et dolore officia et commodi distinctio. Et
                vitae animi aut molestiae animi 33 temporibus ipsam et dolorem
                psam doloribus.
              </p>
              <p className={styles.txt}>
                Qui quis eius non tenetur commodi et placeat autem ex deleniti
                tempora non animi tempora eos quia internos ea nulla error. Aut
                ipsa fuga et quaerat possimus qui error maiores sed praesentium
                adipisci?
              </p>
              <p className={styles.txt}>
                Qui aperiam quae qui tempore velit adipisci consectetur est
                quidem laboriosam est eaque expedita a necessitatibus nisi. Ut
                optio quae qui modi repudiandae ea iste veritatis ex modi
                molestias et laborum quia quo sunt soluta a ullam voluptate.
              </p>
              <p className={styles.txt}>
                Yuis eius non tenetur commodi et placeat autem ex deleniti
                tempora non animi tempora eos quia internos ea nulla error. Aut
                ipsa fuga et quaerat possimus qui error maiores sed praesentium
                adipisci.
              </p>
              <p className={styles.txt}>
                Consectetur adipisci elit, sed eiusmod tempor incidunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur. Quis aute iure reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint obcaecat cupiditat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>

              <p className={styles.txt}>
                Lorem ipsum dolor sit amet. Sit officiis possimus est dolorum
                corrupti ut quos vero. Sed iusto enim ut perspiciatis numquam ut
                deserunt asperiores ut rerum optio sit expedita nisi eum autem
                voluptas et expedita molestiae. Et consectetur quia ut
                asperiores natus et dolore officia et commodi distinctio. Et
                vitae animi aut molestiae animi 33 temporibus ipsam et dolorem
                psam doloribus.
              </p>

              <p className={styles.txt}>
                Qui quis eius non tenetur commodi et placeat autem ex deleniti
                tempora non animi tempora eos quia internos ea nulla error. Aut
                ipsa fuga et quaerat possimus qui error maiores sed praesentium
                adipisci?
              </p>

              <p className={styles.txt}>
                Qui aperiam quae qui tempore velit adipisci consectetur est
                quidem laboriosam est eaque expedita a necessitatibus nisi. Ut
                optio quae qui modi repudiandae ea iste veritatis ex modi
                molestias et laborum quia quo sunt soluta a ullam voluptate.
              </p>

              <p className={styles.txt}>
                Yuis eius non tenetur commodi et placeat autem ex deleniti
                tempora non animi tempora eos quia internos ea nulla error. Aut
                ipsa fuga et quaerat possimus qui error maiores sed praesentium
                adipisci.
              </p>

              <p className={styles.txt}>How do we use your Personal Data?</p>

              <p className={styles.txt}>
                Consectetur adipisci elit, sed eiusmod tempor incidunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur. Quis aute iure reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint obcaecat cupiditat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>

              <br></br>
              <h1 className={styles.subHeading}>Suggestions</h1>

              <p className={styles.txt}>
                If you have any questions or comments about this notice, the
                ways in which we collect and use your information described here
                and in the Privacy Policy, your choices and rights regarding
                such use, or wish to exercise your rights under California law,
                please do not hesitate to contact us at:
              </p>

              <p className={styles.txt}>
                Lorem ipsum dolor sit amet. Sit officiis possimus est dolorum
                corrupti ut quos vero. Sed iusto enim ut perspiciatis numquam ut
                deserunt asperiores ut rerum optio sit expedita nisi eum autem
                voluptas et expedita molestiae. Et consectetur quia ut
                asperiores natus et dolore officia et commodi distinctio. Et
                vitae animi aut molestiae animi 33 temporibus ipsam et dolorem
                psam doloribus.
              </p>

              <p className={styles.txt}>
                Qui quis eius non tenetur commodi et placeat autem ex deleniti
                tempora non animi tempora eos quia internos ea nulla error. Aut
                ipsa fuga et quaerat possimus qui error maiores sed praesentium
                adipisci?
              </p>

              <p className={styles.txt}>
                Qui aperiam quae qui tempore velit adipisci consectetur est
                quidem laboriosam est eaque expedita a necessitatibus nisi. Ut
                optio quae qui modi repudiandae ea iste veritatis ex modi
                molestias et laborum quia quo sunt soluta a ullam voluptate.
              </p>

              <p className={styles.txt}>
                Yuis eius non tenetur commodi et placeat autem ex deleniti
                tempora non animi tempora eos quia internos ea nulla error. Aut
                ipsa fuga et quaerat possimus qui error maiores sed praesentium
                adipisci.
              </p>

              <p className={styles.txt}>
                Consectetur adipisci elit, sed eiusmod tempor incidunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur. Quis aute iure reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint obcaecat cupiditat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.{' '}
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer></Footer>
    </>
  )
}

export default artist_term_and_condition
