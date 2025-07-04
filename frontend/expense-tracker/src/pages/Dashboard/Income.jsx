import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { useEffect } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import { toast } from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'

const Income = () => {
  useUserAuth()
  const [incomeData, setIncomeData] = useState([])
  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [loading, setLoading] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openIncomeProof, setOpenIncomeProof] = useState({
    show: false,
    imageUrl: null,
  });


  const fetchIncomeDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      )
      //.data is inbuilt
      if (response.data) {
        setIncomeData(response.data)

      }

    } catch (err) {
      console.log("something went wrong. Please try again", err)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchIncomeDetails()
    return () => { }
  }, [])

  //handle add income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon, imageUrl } = income   //destructuring income object

    //validation
    //trim() removes white spaces
    if (!source.trim()) {
      toast.error("Source is required")
      return
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid integer greater than 0.")
    }

    if (!date) {
      toast.error("Date is required.")
    }
    try {

      const response = await axiosInstance.post(
        `${API_PATHS.INCOME.ADD_INCOME}`,
        { source, amount, date, icon, imageUrl }
      )
      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchIncomeDetails()
    } catch (err) {
      console.error("something went wrong", err);

    }
  }

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Income details deleted successfully")
      fetchIncomeDetails()
    } catch (error) {
      console.error("Error deleting income", error.response?.data?.message || error.message)
    }
  }
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, { responseType: "blob", })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again.");
    }
  }

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadIncomeDetails}
            onPreview={(imageUrl) =>
              setOpenIncomeProof({
                show: true,
                imageUrl,
              })
            }
          />

        </div>
        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
        <Modal
          isOpen={openIncomeProof.show}
          onClose={() => setOpenIncomeProof({ show: false, imageUrl: null })}
          title="Income Proof"
        >
          {openIncomeProof.imageUrl && (
            <img
              src={openIncomeProof.imageUrl}
              alt="Income Proof"
              className="w-full max-h-[400px] object-contain rounded"
            />
          )}
        </Modal>


      </div>
    </DashboardLayout>
  )
}

export default Income
