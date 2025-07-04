import React, { useState, useRef } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'
import uploadImage from '../../utils/uploadImage'

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
        imageUrl: ""
    })
    const [previewURL, setPreviewURL] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const fileInputRef = useRef(null)   // ✅ useRef for file

    const handleChange = (key, value) => setIncome({ ...income, [key]: value })

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
                const folderName = "Income_Folder"
                const res = await uploadImage(fileInputRef.current.files[0], folderName)
                imageUrl = res.imageUrl
            }
            onAddIncome({ ...income, imageUrl })
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
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, etc"
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />

            <div className="mt-4 flex flex-col items-center">
                <label className="block text-lg mb-1">Attach Income Proof (optional)</label>
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
                    {loading ? "Saving..." : "Add Income"}
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm
