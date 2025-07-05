import React from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
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

  // Shorten large values (1L+)
  const formatYAxis = (value) =>
    value >= 100000 ? `${(value / 100000).toFixed(1)}L` : addThousandSeparator(value);

  return (
    <div className="w-full h-64 sm:h-72 overflow-x-auto">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            interval="preserveStartEnd"
            tick={{ fontSize: 10 }}
            angle={-45}
            dy={10}
          />

          <YAxis
            tickFormatter={formatYAxis}
            padding={{ top: 20, bottom: 20 }}
            tick={{ fontSize: 10 }}
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
