import React from 'react'
import { addThousandSeparator } from '../../utils/helper'
import CustomPieChart from '../Charts/CustomPieChart'

// 🎨 You can tweak these as per income/expense/balance color style
const COLORS = ["#875CF5", "#FF4D4F", "#4CAF50"]

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  // 🧮 Prepare chart data
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome }
  ]

  // 📌 Check if all values are zero or no valid data
  const total = totalBalance + totalIncome + totalExpense
  const hasData = total > 0

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      {hasData ? (
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`Rs ${addThousandSeparator(totalBalance)}`}
          colors={COLORS}
          showTextAnchor
        />
      ) : (
        <p className='text-center text-sm text-gray-500 mt-8'>
          No financial data available.
        </p>
      )}
    </div>
  )
}

export default FinanceOverview
