import React, { useState, useRef } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'
import uploadImage from '../../utils/uploadImage'

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
        imageUrl: ""
    })
    const [previewURL, setPreviewURL] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const fileInputRef = useRef(null)

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value })

    const handleImageChange = () => {
        const file = fileInputRef.current.files[0]
        if (file) {
            setPreviewURL(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        let imageUrl = ""

        try {
            if (fileInputRef.current && fileInputRef.current.files[0]) {
                const folderName = "Expense_Folder"
                const res = await uploadImage(fileInputRef.current.files[0], folderName)
                imageUrl = res.imageUrl
            }
            onAddExpense({ ...expense, imageUrl })
        } catch (err) {
            console.error(err)
            setError("Image upload failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Expense Category"
                placeholder="Rent, Shopping, etc"
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />

            <div className="mt-4 flex flex-col items-center">
                <label className="block text-lg mb-1">Attach Expense Proof (optional)</label>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <button
                    type="button"
                    className="bg-gray-200 rounded px-2 py-1 text-xs cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                >
                    Choose Image
                </button>
                {previewURL && (
                    <img
                        src={previewURL}
                        alt="preview"
                        className="w-28 h-28 object-cover mt-2 rounded shadow border"
                    />
                )}
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {loading ? "Saving..." : "Add Expense"}
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm
