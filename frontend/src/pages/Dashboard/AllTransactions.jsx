import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import moment from "moment";
import { addThousandSeparator } from "../../utils/helper";
import { toast } from "react-hot-toast";
import { LuSearch, LuCalendar } from "react-icons/lu";
import { FaSpinner, FaExclamationCircle, FaSync } from "react-icons/fa";

const AllTransactions = () => {
  useUserAuth();

  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [openDeleteModal, setOpenDeleteModal] = useState({
    show: false,
    data: null,
  });
  const [openProofModal, setOpenProofModal] = useState({
    show: false,
    imageUrl: null,
  });

  const fetchAllTransactions = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const [incomeResponse, expenseResponse] = await Promise.all([
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
      ]);

      const incomeTransactions = incomeResponse.data || [];
      const expenseTransactions = expenseResponse.data || [];

      const combinedTransactions = [
        ...incomeTransactions.map((item) => ({ ...item, type: "income" })),
        ...expenseTransactions.map((item) => ({ ...item, type: "expense" })),
      ];

      setAllTransactions(combinedTransactions);
    } catch (err) {
      console.error("All transactions fetch error:", err);
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const handleDeleteTransaction = async (transaction) => {
    if (!transaction) return;
    try {
      if (transaction.type === "expense") {
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(transaction._id));
      } else {
        await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(transaction._id));
      }
      toast.success("Transaction deleted successfully");
      setOpenDeleteModal({ show: false, data: null });
      fetchAllTransactions();
    } catch (err) {
      console.error("Delete error", err);
      toast.error("Failed to delete transaction");
    }
  };

  const getFilteredTransactions = () => {
    if (!allTransactions || allTransactions.length === 0) return [];

    let filtered = allTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.source?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === "all" || transaction.type === filterType;

      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      }
      return 0;
    });

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  if (loading) {
    return (
      <DashboardLayout activeMenu="All Transactions">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <FaSpinner className="animate-spin mx-auto text-blue-500 mb-4" size={48} />
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout activeMenu="All Transactions">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <FaExclamationCircle className="mx-auto text-red-500 mb-4" size={48} />
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchAllTransactions}
              className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaSync size={16} />
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="All Transactions">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">All Transactions</h1>
            <p className="text-sm text-gray-600 mt-1">View and manage all your financial transactions</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Total: {filteredTransactions.length} transactions</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Transactions ({filteredTransactions.length})
            </h2>
          </div>
          <div className="p-4">
            {filteredTransactions.length > 0 ? (
              <div className="space-y-2">
                {filteredTransactions.map((transaction) => (
                  <TransactionInfoCard
                    key={transaction._id}
                    title={transaction.type === "expense" ? transaction.category : transaction.source}
                    icon={transaction.icon}
                    date={moment(transaction.date).format("Do MMM YYYY")}
                    amount={addThousandSeparator(transaction.amount)}
                    type={transaction.type}
                    imageUrl={transaction.imageUrl}
                    onDelete={() => setOpenDeleteModal({ show: true, data: transaction })}
                    onPreview={() => setOpenProofModal({ show: true, imageUrl: transaction.imageUrl })}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <LuCalendar className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No transactions found</p>
                <p className="text-sm text-gray-400 mt-1">
                  {searchTerm || filterType !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Start by adding your first transaction"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={openDeleteModal.show}
        onClose={() => setOpenDeleteModal({ show: false, data: null })}
        title="Delete Transaction"
      >
        <DeleteAlert
          content={`Are you sure you want to delete this ${openDeleteModal.data?.type} transaction?`}
          onDelete={() => handleDeleteTransaction(openDeleteModal.data)}
        />
      </Modal>

      {/* Proof Modal */}
      <Modal
        isOpen={openProofModal.show}
        onClose={() => setOpenProofModal({ show: false, imageUrl: null })}
        title="Transaction Proof"
      >
        {openProofModal.imageUrl && (
          <img
            src={openProofModal.imageUrl}
            alt="Transaction Proof"
            className="w-full max-h-[400px] object-contain rounded"
          />
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default AllTransactions;
