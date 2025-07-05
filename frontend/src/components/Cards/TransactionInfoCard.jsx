import React from "react";
import {
    LuTrendingDown,
    LuTrendingUp,
    LuUtensils,
    LuTrash2,
    LuEye,
} from "react-icons/lu";

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete,
    imageUrl,
    onPreview
}) => {
    const getAmountStyles = () =>
        type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

    return (
        <div className="group relative rounded-lg hover:bg-gray-100/60 transition-all duration-200">
            {/* Mobile Layout - Stacked */}
            <div className="block sm:hidden p-3 space-y-3">
                {/* Top Section: Icon + Title + Date */}
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center text-lg text-gray-800 bg-gray-100 rounded-full flex-shrink-0">
                        {icon ? (
                            <img src={icon} alt={title} className="w-5 h-5" />
                        ) : (
                            <LuUtensils />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-700 font-medium truncate">{title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{date}</p>
                    </div>
                </div>

                {/* Bottom Section: Amount + Actions */}
                <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <h6 className="text-xs font-medium">
                            {type === "income" ? "+" : "-"} Rs {amount}
                        </h6>
                        {type === "income" ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {imageUrl && (
                            <button
                                className="text-gray-400 hover:text-blue-500 transition-colors p-1.5 rounded-full hover:bg-blue-50"
                                onClick={onPreview}
                            >
                                <LuEye size={16} />
                            </button>
                        )}
                        {!hideDeleteBtn && (
                            <button
                                className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50"
                                onClick={onDelete}
                            >
                                <LuTrash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop Layout - Horizontal */}
            <div className="hidden sm:flex items-center gap-4 p-3">
                <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full flex-shrink-0">
                    {icon ? (
                        <img src={icon} alt={title} className="w-6 h-6" />
                    ) : (
                        <LuUtensils />
                    )}
                </div>

                <div className="flex-1 flex items-center justify-between min-w-0">
                    <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-700 font-medium truncate">{title}</p>
                        <p className="text-xs text-gray-400 mt-1">{date}</p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            {imageUrl && (
                                <button
                                    className="text-gray-400 hover:text-blue-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity cursor-pointer"
                                    onClick={onPreview}
                                >
                                    <LuEye size={18} />
                                </button>
                            )}

                            {!hideDeleteBtn && (
                                <button
                                    className="text-gray-400 hover:text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity cursor-pointer"
                                    onClick={onDelete}
                                >
                                    <LuTrash2 size={18} />
                                </button>
                            )}
                        </div>

                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                            <h6 className="text-xs font-medium">
                                {type === "income" ? "+" : "-"} Rs {amount}
                            </h6>
                            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;