import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label>{label}</label>
            <div className='input-box flex items-center gap-2'>
                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    showPassword ? (
                        <FaRegEye
                            size={22}
                            className="text-primary cursor-pointer"
                            onClick={toggleShowPassword}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className="text-slate-400 cursor-pointer"
                            onClick={toggleShowPassword}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Input;
