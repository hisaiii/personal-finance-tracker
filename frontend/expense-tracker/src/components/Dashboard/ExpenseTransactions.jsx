import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { addThousandSeparator } from '../../utils/helper'

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className='card '>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expenses</h5>
        <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base' /></button>

      </div>
      <div className='mt-6'>
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.category || "Unknown"}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={addThousandSeparator(item.amount)}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">No expense transactions found.</p>
        )}

      </div>
    </div>
  )
}

export default ExpenseTransactions
