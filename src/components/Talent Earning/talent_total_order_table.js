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
    width: 30,
  },
  {
    field: 'orderno',
    headerName: 'Order No',
    headerClassName: 'super-app-theme--header',
    width: 100,
  },
  {
    field: 'clientname',
    headerName: 'Client Name',
    headerClassName: 'super-app-theme--header',
    width: 100,
  },
  {
    field: 'orderdate',
    headerName: 'Order Date',
    headerClassName: 'super-app-theme--header',
    width: 100,
  },
  {
    field: 'prices',
    headerName: 'Price',
    headerClassName: 'super-app-theme--header',
    width: 150,
  },

  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    headerClassName: 'super-app-theme--header',
    width: 150,
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
    transaction_id: ' 123311123019',
  },
  {
    id: 2,
    orderno: 'Lorum 02',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    transaction_id: '123311123019',
  },
  {
    id: 3,
    orderno: 'Lorum 03',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    transaction_id: '123311123019 ',
  },
  {
    id: 4,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    transaction_id: '123311123019',
  },
  {
    id: 5,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    transaction_id: '123311123019',
  },
  {
    id: 6,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    transaction_id: '123311123019',
  },
  {
    id: 7,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    transaction_id: '123311123019 ',
  },
  {
    id: 8,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    transaction_id: '123311123019',
  },
  {
    id: 9,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 5,000.0',
    transaction_id: '123311123019',
  },
  {
    id: 10,
    orderno: 'Lorum 01',
    clientname: 'Lorum',
    orderdate: '10-10-22 ',
    prices: 'PKR 10,000.0',
    transaction_id: '123311123019',
  },
]

export default function Talent_Order_Table() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={styles.Table_Alignment_setting}>
            <Box
              class={styles.Table_Alignment_BOX}
              sx={{
                height: 650,
                width: '94.49%',
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
