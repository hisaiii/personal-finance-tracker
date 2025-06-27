import React, { useMemo } from 'react'
import { addThousandSeparator } from '../../utils/helper'
import CustomPieChart from '../Charts/CustomPieChart'
import { generateColors } from '../../utils/helper'

const Last60DaysIncome = ({ data, total }) => {
  // 🧠 useMemo for optimized computation
  const chartData = useMemo(() => {
    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)

    const filtered = data.filter(item => new Date(item.date) >= sixtyDaysAgo)

    const grouped = {}
    filtered.forEach(item => {
      grouped[item.source] = (grouped[item.source] || 0) + item.amount
    })

    return Object.entries(grouped).map(([source, amount]) => ({
      name: source,
      amount
    }))
  }, [data])

  const COLORS = useMemo(() => generateColors(chartData.length), [chartData.length])

  return (
    <div className='card'>
      <div className='flex'>
        <h5 className='text-lg'>Last 60 Days Income</h5>
      </div>

      {chartData.length > 0 ? (
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`Rs ${addThousandSeparator(total)}`}
          colors={COLORS}
          showTextAnchor
        />
      ) : (
        <p className="text-center text-sm text-gray-500 mt-8">
          No income transactions in the last 60 days.
        </p>
      )}
    </div>
  )
}

export default Last60DaysIncome
