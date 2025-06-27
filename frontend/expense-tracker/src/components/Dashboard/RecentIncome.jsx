import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { addThousandSeparator } from '../../utils/helper'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
const RecentIncome = ({ data, onSeeMore }) => {

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Incomes</h5>
                <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base' /></button>

            </div>
            <div className='mt-6'>
{data && data.length > 0 ? (
  data.slice(0, 5).map((item) => (
    <TransactionInfoCard
      key={item._id}
      title={item.source}
      icon={item.icon}
      date={moment(item.date).format("Do MMM YYYY")}
      amount={addThousandSeparator(item.amount)}
      type="income"
      hideDeleteBtn
    />
  ))
) : (
  <p className="text-sm text-gray-500 text-center">No expense data found.</p>
)}

      </div>
        </div>
    )
}

export default RecentIncome
