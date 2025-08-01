import React from 'react';
import { addThousandSeparator } from '../../utils/helper';
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-lg border border-gray-300 p-2">
                <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].name}</p>
                <p className="text-sm text-gray-600">
                    Amount: <span className="text-sm font-medium text-gray-900">
                        ₹{addThousandSeparator(payload[0].value)}
                    </span>        </p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
