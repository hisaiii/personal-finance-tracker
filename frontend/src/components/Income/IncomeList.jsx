import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from "../Cards/TransactionInfoCard"
import moment from 'moment'

const IncomeList = ({ transactions, onDelete, onDownload, onPreview }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between gap-2'>
                <h5 className='text-lg font-semibold'>Income Sources</h5>
                <button className='card-btn flex-shrink-0' onClick={onDownload}>
                    <LuDownload className='text-base' /> Download
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4'>
                {transactions && transactions.length > 0 ? (
                    transactions.map((income) => (
                        <TransactionInfoCard
                            key={income._id}
                            title={income.source}
                            icon={income.icon}
                            date={moment(income.date).format("Do MMM YYYY")}
                            amount={income.amount}
                            type="income"
                            onDelete={() => onDelete(income._id)}
                            imageUrl={income.imageUrl}
                            onPreview={() => onPreview(income.imageUrl)}
                        />
                    ))
                ) : (
                    <p className="text-center text-sm text-gray-500 mt-4 col-span-full">
                        No income records found.
                    </p>
                )}
            </div>
        </div>
    )
}

export default IncomeList