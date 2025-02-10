import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
// import styles from "../styles/TalentDashboard.module.css";
import styles from '../../../styles/TalentDashboard.module.css'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'super-app-theme--header',
    width: 70,
  },
  {
    field: 'orderno',
    headerName: 'Order No',
    headerClassName: 'super-app-theme--header',
    width: 180,
  },
  {
    field: 'clientname',
    headerName: 'Client Name',
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
    field: 'order_type',
    headerName: 'Order Type',
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
    order_type: 'Birthday Wish',
  },
  {
    id: 2,
    orderno: 'Lorum 02',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    order_type: 'Roast',
  },
  {
    id: 3,
    orderno: 'Lorum 03',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    order_type: 'Birthday Wish',
  },
  {
    id: 4,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    order_type: 'Roast',
  },
  {
    id: 5,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    order_type: 'Roast',
  },
  {
    id: 6,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    order_type: 'Chart',
  },
  {
    id: 7,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    order_type: 'Birthday Wish',
  },
  {
    id: 8,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    order_type: 'Roast',
  },
  {
    id: 9,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    order_type: 'Chart',
  },
  {
    id: 10,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    order_type: 'Birthday Wish',
  },
]

export default function DataTable() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={styles.tablealignmentsetting}>
            <Box
              class={styles.Table_Alignment_BOX}
              sx={{
                height: 650,
                width: '93.79%',
                margin: 5,
                '& .super-app-theme--header': {
                  backgroundColor: '#CEA234',
                  color: '#1B1B1B',
                },
              }}
            >
              <DataGrid
                style={{ color: '#FEFEFE' }}
                rows={rows}
                columns={columns}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
