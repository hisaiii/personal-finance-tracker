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
        <div className="group relative mt-2 p-3 rounded-lg hover:bg-gray-100/60">
            {/* Original Desktop Layout */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                    {icon ? (
                        <img src={icon} alt={title} className="w-6 h-6" />
                    ) : (
                        <LuUtensils />
                    )}
                </div>

                <div className="flex-1 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-700 font-medium">{title}</p>
                        <p className="text-xs text-gray-400 mt-1">{date}</p>
                    </div>

                    {/* Desktop: Original buttons in the middle */}
                    <div className="hidden sm:flex items-center gap-2">
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
                </div>

                <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
                >
                    <h6 className="text-xs font-medium">
                        {type === "income" ? "+" : "-"} Rs {amount}
                    </h6>
                    {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                </div>
            </div>

            {/* Mobile: Action buttons at bottom */}
            <div className="flex sm:hidden items-center justify-end gap-3 mt-3 pt-2 border-t border-gray-100">
                {imageUrl && (
                    <button
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-500 transition-colors"
                        onClick={onPreview}
                    >
                        <LuEye size={14} />
                        View Proof
                    </button>
                )}
                {!hideDeleteBtn && (
                    <button
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors"
                        onClick={onDelete}
                    >
                        <LuTrash2 size={14} />
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default TransactionInfoCard;