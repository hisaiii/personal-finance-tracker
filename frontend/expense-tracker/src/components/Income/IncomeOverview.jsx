import React, { useEffect, useState } from 'react'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions)
        setChartData(result)

        return () => {

        }
    }, [transactions])
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg'>Income Overview</h5>
                    <p className='text-sm text-gray-400 mt-0.5'> Track your earnings over time and analyze your income trends this year</p>
                </div>
                <button className='add-btn'
                    onClick={onAddIncome}
                >
                    <LuPlus className='text-lg' />
                    Add Income
                </button>

            </div>
            <div className='mt-10'>
                {
                    chartData && chartData.length > 0 ? (
                        <CustomBarChart data={chartData} />
                    ) : (
                        <p className="text-center text-sm text-gray-500 mt-4">
                            No income data available.
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default IncomeOverview
