import React, { useEffect } from "react";
import { useSplitwise } from "../../context/SplitwiseContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FcMoneyTransfer } from "react-icons/fc";
import axiosInstance from "../../utils/axiosInstance";
import { useUserAuth } from "../../hooks/useUserAuth";

const SplitwiseDetails = () => {
  useUserAuth();
  const {
    splitwiseData,
    setSplitwiseData,
    splitwiseLoading,
    setSplitwiseLoading,
  } = useSplitwise();

  useEffect(() => {
    // Fixed condition: check if data doesn't exist OR if details array is empty/missing
    if (!splitwiseData || !splitwiseData.details || splitwiseData.details.length === 0) {
      setSplitwiseLoading(true);
      axiosInstance
        .get("/api/v1/splitwise/me")
        .then((res) => {
          if (res.data && res.data.success) {
            setSplitwiseData(res.data);
          }
        })
        .catch((err) => {
          console.error("SplitwiseDetails fetch error", err);
        })
        .finally(() => setSplitwiseLoading(false));
    }
  }, [splitwiseData, setSplitwiseData, setSplitwiseLoading]);

  if (splitwiseLoading) {
    return (
      <DashboardLayout activeMenu="Splitwise">
        <div className="p-6 text-center">
          <div className="animate-spin h-8 w-8 border-2 rounded-full mx-auto border-primary border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading splitwise data...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!splitwiseData || !splitwiseData.details || splitwiseData.details.length === 0) {
    return (
      <DashboardLayout activeMenu="Splitwise">
        <div className="p-6 text-center">
          <p className="text-gray-600">No splitwise details found.</p>
          <p>Please connect to Splitwise if you haven't.</p>
          <p className="text-lg">Or please refresh the page to get the latest data</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Splitwise">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FcMoneyTransfer className="text-3xl" />
          Splitwise Details
        </h2>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="divide-y">
            {splitwiseData.details.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{item.friend}</span>
                  <span className="text-xs text-gray-500 uppercase">{item.type}</span>
                </div>
                <div
                  className={`font-bold ${
                    item.amount < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {item.amount} {item.currency}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SplitwiseDetails;