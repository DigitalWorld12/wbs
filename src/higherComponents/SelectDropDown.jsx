import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import styles from '../../styles/SelectDropDown.module.css'
export default function SelectDropDown() {
  const [time, setTime] = React.useState(10)

  const handleChange = (event) => {
    setTime(event.target.value)
  }

  return (
    <FormControl
      className={styles.SelectDropDown_form_control}
      style={{
        color: 'white',
        borderRadius: 30,
        borderStyle: 'solid',
        borderColor: '#FFF',
        borderWidth: '1px',
        height: 40,
      }}
    >
      <Select
        style={{ color: '#fff', borderRadius: 30, height: 40 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={time}
        label="Agtimee"
        onChange={handleChange}
      >
        <MenuItem value={10}>Max video time -30 sec</MenuItem>
        <MenuItem value={20}>Max video time -45 sec</MenuItem>
        <MenuItem value={30}>Max video time -50 sec</MenuItem>
      </Select>
    </FormControl>
  )
}
