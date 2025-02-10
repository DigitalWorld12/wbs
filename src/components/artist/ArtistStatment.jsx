import React, { useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import styles from '../../../styles/Statment.module.css'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import * as XLSX from 'xlsx'

const calculateBalance = (transactions, currentTransaction) => {
  const currentIndex = transactions.indexOf(currentTransaction)
  const previousTransactions = transactions.slice(0, currentIndex)

  const balance = previousTransactions.reduce((total, transaction) => {
    return total + transaction.debit - transaction.credit
  }, 0)

  return balance + currentTransaction.debit - currentTransaction.credit
}

const StatementTable = ({ startDate, endDate, transactions }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 5
  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    if (!startDate || !endDate) return true
    const transactionDate = new Date(transaction.updated_at)
    const formattedTransactionDate = transactionDate.toLocaleDateString('en-CA')
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-CA')
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-CA')

    return (
      formattedTransactionDate >= formattedStartDate &&
      formattedTransactionDate <= formattedEndDate
    )
  })

  const allFilteredTransactions = filteredTransactions

  const displayTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  )

  const exportData = () => {
    const dataToExport = filteredTransactions.map((transaction) => ({
      Transaction_Id: transaction.transaction_id,
      Date: new Date(transaction.updated_at).toISOString().slice(0, 10),
      Debit: transaction.type === 'debit' ? transaction.amount : '-',
      Credit: transaction.type === 'credit' ? transaction.amount : '-',
      Balance: transaction.balance,
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions')
    XLSX.writeFile(workbook, 'statement_data.xlsx')
  }
  return (
    <div className={styles.sub_container}>
      <button onClick={exportData}>Export to Excels</button>

      <div className={styles.table_parent}>
        <table id="statementTable">
          <thead>
            <tr>
              <th>Transaction Id</th>
              <th>Date</th>

              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {displayTransactions.map((transaction, index) => (
              <StatementRow
                key={index}
                transaction={transaction}
                transactions={filteredTransactions}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        onChange={handlePageChange}
        current={currentPage}
        total={filteredTransactions.length}
        pageSize={transactionsPerPage}
        locale={{
          prev_page: 'Previous',
          next_page: 'Next',
          prev_5: 'Previous 5 Pages',
          next_5: 'Next 5 Pages',
          prev_3: 'Previous 3 Pages',
          next_3: 'Next 3 Pages',
        }}
      />
    </div>
  )
}

const StatementRow = ({ transaction, transactions }) => {
  const {
    date,
    description,
    debit,
    credit,
    transactionId,
    transaction_id,
    type,
    updated_at,
    amount,
    balance,
  } = transaction

  const formattedDate = new Date(updated_at)
  const year = formattedDate.getFullYear()
  const month = formattedDate.getMonth() + 1
  const day = formattedDate.getDate()
  return (
    <tr>
      <td>{transaction_id}</td>
      <td>{` ${year}-${month}-${day}`}</td>
      <td>{type === 'debit' ? amount : '-'}</td>
      <td>{type === 'credit' ? amount : '-'}</td>
      <td>{balance}</td>
    </tr>
  )
}

export default StatementTable
