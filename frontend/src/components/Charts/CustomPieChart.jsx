import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {


    return (
        <ResponsiveContainer width="100%" height={360}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={CustomTooltip} />
                <Legend content={CustomLegend} />

                {showTextAnchor && (
                    <g>
                        <text
                            x="50%"
                            y="50%"
                            dy="-0.6em"
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy="1em"
                            textAnchor="middle"
                            fill="#333"
                            fontSize="20"
                            fontWeight="600"
                        >
                            {totalAmount}
                        </text>
                    </g>
                )}



            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart
