/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-key */
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import styles from '../../styles/SelectFullWidth.module.css'

import React, { useState } from 'react'

export default function SelectFullWidth({
  value,
  setValue,
  dropDownValues,
  placeholder,
}) {
  const [age, setAge] = useState(10)
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <FormControl className={styles.Select_full_width_form_control} fullWidth>
      <InputLabel
        style={{
          color: '#fff',
        }}
      >
        {value ? '' : placeholder}
      </InputLabel>
      <Select
        style={{ color: '#fff' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        {dropDownValues?.map((item) => (
          <MenuItem value={item?.id}>{item?.description}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
