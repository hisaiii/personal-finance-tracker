import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", income: 1200, expense: 800 },
  { month: "Feb", income: 1500, expense: 1000 },
  { month: "Mar", income: 20000, expense: 1600 },
  { month: "Apr", income: 3000, expense: 2500 },
  { month: "May", income: 9000, expense: 6000 },
  { month: "Jun", income: 2200, expense: 180 },
  { month: "Jul", income: 3201, expense: 2600 },
];
export default function IncomeExpenseChart() {
  return (
    <div className="w-full h-[300px] p-2 rounded-xl">
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
