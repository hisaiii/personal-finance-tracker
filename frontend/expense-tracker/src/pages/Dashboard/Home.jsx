import React, { useEffect, useState, useContext } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import InfoCard from '../../components/Cards/InfoCard.jsx';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import { addThousandSeparator } from '../../utils/helper.js';
import RecentTransactions from '../../components/Dashboard/RecentTransactions.jsx';
import FinanceOverview from '../../components/Dashboard/FinanceOverview.jsx';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions.jsx';
import Last30DaysExpense from '../../components/Dashboard/Last30DaysExpense.jsx';
import Last60DaysIncome from '../../components/Dashboard/Last60DaysIncome.jsx';
import RecentIncome from '../../components/Dashboard/RecentIncome.jsx';
import { UserContext } from '../../context/UserContext.jsx';
import { useSplitwise } from '../../context/SplitwiseContext';
import { FcMoneyTransfer } from "react-icons/fc";
import { LuArrowRight } from 'react-icons/lu'
import { AiOutlineFall } from "react-icons/ai";
import { AiOutlineRise } from "react-icons/ai";


const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // get splitwise data from context
  const {
    splitwiseData,
    setSplitwiseData,
    splitwiseLoading,
    setSplitwiseLoading
  } = useSplitwise();

  const fetchSplitwiseData = async () => {
    setSplitwiseLoading(true);
    try {
      const res = await axiosInstance.get('/api/v1/splitwise/me');
      if (res.data && res.data.success) {
        setSplitwiseData(res.data);
        localStorage.setItem("splitwiseData", JSON.stringify(res.data));

      } else {
        setSplitwiseData(null);
      }
    } catch (err) {
      console.error("splitwise data fetch error", err);
      setSplitwiseData(null);
    } finally {
      setSplitwiseLoading(false);
    }
  };

  useEffect(() => {
    fetchSplitwiseData();
  }, []);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const renderSplitwiseCards = () => {
    if (splitwiseLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<FcMoneyTransfer />}
            label="You Lent"
            value="Loading..."
            color="bg-green-100 text-green-700"
          />
          <InfoCard
            icon={<FcMoneyTransfer />}
            label="You Owe"
            value="Loading..."
            color="bg-red-100 text-red-700"
          />
          <InfoCard
            icon={<FcMoneyTransfer />}
            label="Net"
            value="Loading..."
            color="bg-gray-200 text-gray-700"
          />
        </div>
      );
    }

    if (splitwiseData && splitwiseData.balances) {
      const net = splitwiseData.balances.netBalance;
      const owe = splitwiseData.balances.totalOwed;
      const lent = splitwiseData.balances.totalToCollect;
      const currency=splitwiseData.balances.currency
      return (
<div className="p-6 rounded-2xl shadow  bg-white">
  <div className="flex justify-between items-center mb-4">
    <h4 className="text-lg font-semibold">Splitwise Summary</h4>
    <button
      onClick={() => navigate('/splitwise-details')}
      className="card-btn"
    >
      See More <LuArrowRight className="text-base" />
    </button>
  </div>

  <div className="flex flex-wrap justify-center items-center gap-3 mt-4">

    {/* You Lent */}
    <InfoCard
      icon={<AiOutlineRise />}
      label="You Lent"
      value={`${lent} ${currency}`}
      color="bg-green-500 text-green-800"
      className="w-40"
    />

    {/* plus sign */}
    <span className="text-xl font-bold">+</span>

    {/* You Owe */}
    <InfoCard
      icon={<AiOutlineFall />}
      label="You Owe"
      value={`${owe} ${currency} `}
      color="bg-red-500 text-red-800"
      className="w-40"
    />

    {/* equals sign */}
    <span className="text-xl font-bold">=</span>

    {/* Net */}
    <InfoCard
      icon={<FcMoneyTransfer />}
      label={ `Net ,${ splitwiseData.summary.status}`}
      value={`${net} ${currency}`}
      color={net < 0 ? "bg-red-500 text-red-900" : "bg-green-500 text-green-900"}
      className="w-40"
    />

  </div>
</div>


      );
    }

    
  };


  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

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
{ splitwiseData && splitwiseData.balances && (
    <div className="mt-6">
      {renderSplitwiseCards()}
    </div>
)}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading dashboard data...</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpenses || 0}
            />
            <ExpenseTransactions
              transactions={dashboardData?.last30DaysExpenses?.transactions || []}
              onSeeMore={() => navigate("/expense")}
            />
            <Last30DaysExpense
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />
            <Last60DaysIncome
              data={dashboardData?.last60DaysIncome?.transactions || []}
              total={dashboardData?.last60DaysIncome?.total || 0}
            />
            <RecentIncome
              data={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={() => navigate("/income")}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
