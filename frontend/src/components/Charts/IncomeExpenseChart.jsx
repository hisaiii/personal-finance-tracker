import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", income: 120, expense: 80 },
  { month: "Feb", income: 150, expense: 100 },
  { month: "Mar", income: 200, expense: 160 },
  { month: "Apr", income: 300, expense: 250 },
  { month: "May", income: 90, expense: 60 },
  { month: "Jun", income: 220, expense: 180 },
  { month: "Jul", income: 320, expense: 260 },
];

export default function IncomeExpenseChart() {
  return (
    <div className="w-full h-[300px] bg-white p-2 rounded-xl shadow-md">
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
