import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", income: 12000, expense: 8700 },
  { month: "Feb", income: 15000, expense: 4000 },
  { month: "Mar", income: 20000, expense: 8600 },
  { month: "Apr", income: 30000, expense: 8500 },
  { month: "May", income: 9000, expense: 6000 },
  { month: "Jun", income: 22000, expense: 18000},
  { month: "Jul", income: 32010, expense: 9600 },
];
export default function IncomeExpenseChart() {
  return (
    <div className="w-full h-[300px] p-2 rounded-xl bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend />
          <Bar dataKey="income" fill="#8b5cf6" />
          <Bar dataKey="expense" fill="#a78bfa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
