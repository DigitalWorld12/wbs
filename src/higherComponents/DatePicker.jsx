// import React, { useState } from 'react'
// import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date'

// const DatePicker = (setDate, date) => {
//   const [monthError, setMonthError] = useState(false)
//   const [dayError, setDayError] = useState(false)
//   const [yearError, setYearError] = useState(false)

//   const submit = () => {
//     if (date?.date?.month === '') {
//       setMonthError(true)
//     }
//     if (date?.date?.day === '') {
//       setDayError(true)
//     }
//     if (date?.date?.year === '') {
//       setYearError(true)
//     }
//   }
//   return (
//     <div className="test">
//       <MonthPicker
//         defaultValue={'MM'}
//         numeric
//         endYearGiven
//         year={date?.date?.year}
//         value={date?.date?.month}
//         onChange={(month) => {
//           setDate?.setDate((prev) => ({ ...prev, month }))
//           setMonthError(false)
//         }}
//         id={'month'}
//         classes={`dropdown ${dayError ? 'error' : ''}`}
//         optionClasses={'option'}
//       />
//       <DayPicker
//         defaultValue={'DD'}
//         year={date?.date?.year}
//         month={date?.date?.month}
//         endYearGiven
//         value={date?.date?.day}
//         onChange={(day) => {
//           setDate?.setDate((prev) => ({ ...prev, day }))
//         }}
//         id={'day'}
//         classes={`dropdown ${monthError ? 'error' : ''}`}
//         optionClasses={'option'}
//       />

//       <YearPicker
//         defaultValue={'YYYY'}
//         start={2010}
//         end={2020}
//         reverse
//         value={date?.date?.year}
//         onChange={(year) => {
//           setDate?.setDate((prev) => ({ ...prev, year }))
//         }}
//         id={'year'}
//         classes={`dropdown ${yearError ? 'error' : ''}`}
//         optionClasses={'option'}
//       />
//     </div>
//   )
// }

// export default DatePicker


import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = ({ setDate, date }) => {
  const [selectedDate, setSelectedDate] = useState(
    date?.date
      ? new Date(date.date.year, date.date.month - 1, date.date.day)
      : null
  )

  const [errors, setErrors] = useState({
    date: false,
  })

  const handleChange = (dateObj) => {
    if (!dateObj) return

    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1 // Months are 0-indexed
    const year = dateObj.getFullYear()

    setSelectedDate(dateObj)
    setDate.setDate({ day, month, year })
    setErrors({ date: false })
  }

  const submit = () => {
    if (!selectedDate) {
      setErrors({ date: true })
    }
  }

  return (
    <div className="test">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
        className={`datepicker-input ${errors.date ? 'error' : ''}`}
      />
    </div>
  )
}

export default DatePicker
