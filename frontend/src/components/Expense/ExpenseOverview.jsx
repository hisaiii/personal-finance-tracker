import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartdata } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseLineChartdata(transactions)
        setChartData(result)
    }, [transactions])  // ✅ fix dependency

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className='text-lg'>Expense Overview</h5>
                    <p className='text-sm text-gray-400 mt-0.5'>
                        Track your spending trends over time and gain insights into where your money went this year
                    </p>
                </div>
                <button
                    className='add-btn'
                    onClick={onExpenseIncome}
                >
                    <LuPlus className='text-lg' />
                    Add Expense
                </button>
            </div>

            <div className='mt-10'>
                {chartData && chartData.length > 0 ? (
                    <CustomLineChart data={chartData} />
                ) : (
                    <p className="text-center text-sm text-gray-500 mt-4">
                        No expense data available.
                    </p>
                )}
            </div>
        </div>
    )
}

export default ExpenseOverview