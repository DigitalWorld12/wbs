import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import styles from '../../../styles/TalentDashboard.module.css'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'super-app-theme--header',
    width: 55,
  },
  {
    field: 'orderno',
    headerName: 'Order No',
    headerClassName: 'super-app-theme--header',
    width: 180,
  },
  {
    field: 'clientname',
    headerName: 'Talent Name',
    headerClassName: 'super-app-theme--header',
    width: 180,
  },
  {
    field: 'orderdate',
    headerName: 'Order Date',
    headerClassName: 'super-app-theme--header',
    width: 180,
  },
  {
    field: 'prices',
    headerName: 'Price',
    headerClassName: 'super-app-theme--header',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'Status',
    headerClassName: 'super-app-theme--header',
    width: 180,
  },
]

const rows = [
  {
    id: 1,
    orderno: 'Lorum 01',
    headerClassName: 'super-app-theme--header',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    status: 'Received',
  },
  {
    id: 2,
    orderno: 'Lorum 02',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    status: 'In Process',
  },
  {
    id: 3,
    orderno: 'Lorum 03',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    status: 'In Process',
  },
  {
    id: 4,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    status: 'Pending',
  },
  {
    id: 5,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    status: 'Received',
  },
  {
    id: 6,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    status: 'In Process',
  },
  {
    id: 7,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    status: 'In Process',
  },
  {
    id: 8,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    status: 'Pending',
  },
  {
    id: 9,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    status: 'Received',
  },
  {
    id: 10,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    status: 'In Process',
  },
]

export default function DataTable() {
  return (
    <div className={styles.table_display_flex_center}>
      <Box
        className={styles.Table_Alignment_BOX}
        sx={{
          '& .super-app-theme--header': {
            backgroundColor: '#CEA234',
          },
        }}
      >
        <DataGrid className={styles.data_grid} rows={rows} columns={columns} />
      </Box>
    </div>
  )
}
