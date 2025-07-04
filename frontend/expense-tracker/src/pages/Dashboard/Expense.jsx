import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import Modal from '../../components/Modal'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'
import { toast } from 'react-hot-toast'

const Expense = () => {
  useUserAuth()
  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(null)
  const [OpenAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openExpenseProof, setOpenExpenseProof] = useState({
    show: false,
    imageUrl: null,
  })

  const fetchExpenseData = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)
      if (response.data) setExpenseData(response.data)
    } catch (err) {
      console.log("something went wrong. Please try again", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenseData()
  }, [])

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon, imageUrl } = expense

    if (!category.trim()) {
      toast.error("Category is required")
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid number greater than 0")
      return
    }
    if (!date) {
      toast.error("Date is required")
      return
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon, imageUrl })
      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully")
      fetchExpenseData()
    } catch (err) {
      console.error("something went wrong", err)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense deleted successfully")
      fetchExpenseData()
    } catch (error) {
      console.error("Error deleting expense", error.response?.data?.message || error.message)
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute("download", "expense_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading expense details:", error)
      toast.error("Failed to download expense details. Please try again.")
    }
  }

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onPreview={(imageUrl) => setOpenExpenseProof({ show: true, imageUrl })}
          />
        </div>

        <Modal
          isOpen={OpenAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>

        <Modal
          isOpen={openExpenseProof.show}
          onClose={() => setOpenExpenseProof({ show: false, imageUrl: null })}
          title="Expense Proof"
        >
          {openExpenseProof.imageUrl && (
            <img
              src={openExpenseProof.imageUrl}
              alt="Expense Proof"
              className="w-full max-h-[400px] object-contain rounded"
            />
          )}
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
