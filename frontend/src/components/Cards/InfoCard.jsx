import React from 'react'

const InfoCard = ({ icon, label, value, color, children }) => {
  const shouldShowRs = ["Total Balance", "Total Income", "Total Expense"].includes(label);

  return (
    <div className="card flex gap-6">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>

      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-[22px]">
          {shouldShowRs ? `Rs ${value}` : value}
        </span>
      </div>

      {children && <div className="mt-2 text-sm">{children}</div>}
    </div>
  );
};

export default InfoCard
