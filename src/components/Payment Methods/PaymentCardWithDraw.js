import styles from '../../../styles/PaymentMethod.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import localStorage from 'local-storage'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrency } from '@/redux/actions/currencyActions'
import { refreshAuth } from '@/redux/actions/authActions'

const PaymentCardWithDraw = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  const [banks, setBanks] = useState([])
  let localData = ''
  if (typeof window !== 'undefined') {
    if (typeof window !== 'undefined') {
      localData = reactLocalStorage?.getObject('isArtist')
    } else {
      localData = ''
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.get('loginAuth')?.authorisation?.token

        if (!token) {
          return
        }
        const artistdata = reactLocalStorage.getObject('isArtist')
        const artistId = artistdata?.data?.id
        const response = await axios.get(
          ` ${baseURL}/api/artist/all-banks?artist_id=${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const allBanks = response.data.data.map((bank) => {
          return {
            id: bank.id,
            name: bank.bank_name,
          }
        })

        setBanks(allBanks)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [])

  const [formData, setFormData] = useState({
    amount: '',
    bank_id: '',
    artist_id: localData?.data?.id || '',
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.amount) {
      toast.error('Please enter the amount.')
      return
    }
    if (!formData.bank_id) {
      toast.error('Please select a bank.')
      return
    }
    try {
      const response = await axios.post(
        `${baseURL}/api/widthdraw-request`,
        formData,
        {
          headers: {
            Authorization:
              'Bearer ' + localStorage.get('loginAuth')?.authorisation?.token,
          },
        },
      )

      if (response.data.status === 422) {
        toast.error(response.data.message)
      } else {
        toast.success(response.data.message)
        window.location.reload()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  //Currency
  const dispatch = useDispatch()
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyData,
  )
  useEffect(() => {
    dispatch(fetchCurrency())
  }, [dispatch])

  const filteredData = currencyData?.data.filter((item) => item.status === 1)
  const symbol = []
  filteredData?.forEach((item, index) => {
    symbol.push(item.symbol)
  })

  return (
    <>
      <ToastContainer className="tost" />
      <form className={styles.sub_container} onSubmit={handleFormSubmit}>
        <h1 className={styles.Payment_Info_TopHeading}>with draw Request</h1>

        <div className={styles.flex}>
          <input
            className={styles.input}
            type="text"
            placeholder="Amount"
            name="amount"
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
            step="any"
          />
        </div>
        <div className={styles.flex}>
          <select
            className={styles.input}
            name="bank_id"
            onChange={handleInputChange}
          >
            <option value="">Select a bank</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className={styles.flex}
          dangerouslySetInnerHTML={{
            __html: `
      <h3 style="color: white;">
        Total Amount ${symbol ? symbol : ''}
      </h3>
      ${
        localData && localData?.data?.wallet_amount !== undefined
          ? `<h3 style="color: white;">
              ${
                parseInt(localData?.data?.wallet_amount) >= 1000
                  ? parseInt(localData?.data?.wallet_amount).toLocaleString()
                  : localData?.data?.wallet_amount
              }
            </h3>`
          : ''
      }
    `,
          }}
        ></div>

        <button type="submit" className={styles.btn_Book_Now}>
          Proceed
        </button>
      </form>
    </>
  )
}

export default PaymentCardWithDraw
