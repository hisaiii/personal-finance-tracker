import React from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { addThousandSeparator } from "../../utils/helper";

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow rounded border border-gray-200 p-2 text-xs">
          <div className="font-semibold text-purple-800 mb-1">
            {payload[0].payload.category}
          </div>
          <div className="text-gray-600">
            Amount:{" "}
            <span className="font-medium text-gray-900">
              Rs {addThousandSeparator(payload[0].payload.amount)}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
  <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 60, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
<YAxis
  tickFormatter={(value) => ` ${addThousandSeparator(value)}`}
  padding={{ top: 20, bottom: 20 }}
/>
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8b5cf6"
            fill="url(#colorPurple)"
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
