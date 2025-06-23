import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout.jsx'
import { useUserAuth } from '../../hooks/useUserAuth.jsx'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPaths.js'
import InfoCard from '../../components/Cards/InfoCard.jsx'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import { addThousandSeparator } from '../../utils/helper.js'
import RecentTransactions from '../../components/Dashboard/RecentTransactions.jsx'

const Home = () => {
  useUserAuth()

  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)

  // loading: To prevent multiple API calls while the first one is in progress.
  const [loading, setLoading] = useState(null)

  const fetchDashboardData = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      )

      if (response.data) {
        setDashboardData(response.data)

      }

    } catch (err) {
      console.log("something went wrong. Please try again", err)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchDashboardData()
    return () => { }
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* {console.log("Dashboard Data:", dashboardData)} */}
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <InfoCard
          icon={<IoMdCard />}
          label="Total Balance"
          value={addThousandSeparator(dashboardData?.totalBalance || 0)}
          color="bg-primary"
        />
        <InfoCard
          icon={<LuWalletMinimal />}
          label="Total Income"
          value={addThousandSeparator(dashboardData?.totalIncome || 0)}
          color="bg-orange-500"
        />
        <InfoCard
          icon={<LuHandCoins />}
          label="Total Expense"
          value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
          color="bg-red-500"
        />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
             transactions={dashboardData?.recentTransactions}
             onSeeMore={()=>
              navigate("/expense")
             }
          />

        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
