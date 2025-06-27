import React, { useMemo } from 'react'
import { prepareExpenseBarChartdata } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpense = ({ data }) => {
  // 📊 Prepare chart data using helper
  const chartData = useMemo(() => {
    return prepareExpenseBarChartdata(data)
  }, [data])

  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 30 Days Expenses</h5>
      </div>

      {chartData.length > 0 ? (
        <CustomBarChart data={chartData} />
      ) : (
        <p className="text-center text-sm text-gray-500 mt-8">
          No expense data for the last 30 days.
        </p>
      )}
    </div>
  )
}

export default Last30DaysExpense
