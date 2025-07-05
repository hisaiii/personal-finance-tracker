import React from 'react';
import { LuTrendingUpDown } from 'react-icons/lu';
import card2 from "../../assets/images/card2.png";
import IncomeExpenseChart from "../../components/Charts/IncomeExpenseChart.jsx";


const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className={`flex gap-6 bg-white p-4 rounded-xl shadow-md ${color} absolute w-[90%] left-11`}>
            <div className="w-12 h-12 flex items-center justify-center text-[26px] text-white bg-purple-500 rounded-full">
                {icon}
            </div>
            <div>
                <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
                <span className="text-[20px] font-semibold text-black">Rs.{value}</span>
            </div>
        </div>
    );
};

const AuthLayout = ({ children }) => {
    return (
        <div className='flex'>
            <div className='w-screen md:w-[60vw] h-screen px-12 pb-12 pt-10'>
<h2 className="text-3xl font-bold text-slate-800 tracking-tight drop-shadow-md">
  Fin<span className="text-primary">Sight</span>
</h2>

                {children}
            </div>

            <div className='hidden md:block w-[45vw] bg-violet-50 bg-cover bg-center overflow-hidden relative'>
                <div className='w-48 h-48 bg-purple-600 absolute  -left-10 -top-9  rounded-[30px]'></div>
                <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-700 absolute top-40 -right-10'></div>
                <div className='w-48 h-48 bg-purple-600 absolute -left-10 -bottom-9 rounded-[30px]'></div>
                <div className="grid grid-cols-1 z-20 mt-6">
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track Your Income & Expenses"
                        value="4xx,xxx"
                        color="bg-primary"
                    />
                </div>
<div className="absolute top-60 left-10 w-64 md:w-[90%] md:h-[55%] rounded-3xl shadow-lg shadow-blue-400/15 bg-white p-2">
                    <IncomeExpenseChart />
                </div>            </div>
        </div>
    );
};

export default AuthLayout;
