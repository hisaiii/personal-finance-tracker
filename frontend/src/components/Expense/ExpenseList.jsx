import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from "../Cards/TransactionInfoCard"
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete, onDownload, onPreview }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between gap-2'>
                <h5 className='text-lg font-semibold'>Expense Category</h5>
                <button className='card-btn flex-shrink-0' onClick={onDownload}>
                    <LuDownload className='text-base' /> Download
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4'>
                {transactions && transactions.length > 0 ? (
                    transactions.map((expense) => (
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.date).format("Do MMM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense._id)}
                            imageUrl={expense.imageUrl}
                            onPreview={() => onPreview(expense.imageUrl)}
                        />
                    ))
                ) : (
                    <p className="text-center text-sm text-gray-500 mt-4 col-span-full">
                        No expense records found.
                    </p>
                )}
            </div>
        </div>
    )
}

export default ExpenseList