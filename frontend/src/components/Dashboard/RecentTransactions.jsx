import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { addThousandSeparator } from '../../utils/helper'

const RecentTransactions = ({ transactions, onSeeMore }) => {
  const hasData = transactions && transactions.length > 0;

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Recent Transactions</h5>
        <button className='card-btn' onClick={onSeeMore}>
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6'>
        {hasData ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === 'expense' ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={addThousandSeparator(item.amount)}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <p className='text-center text-sm text-gray-500 mt-4'>
            No recent transactions available.
          </p>
        )}
      </div>
    </div>
  )
}

export default RecentTransactions
