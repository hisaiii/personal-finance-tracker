import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/charAvtar';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    const handleClick = (route) => {
        if (route === "logout" || route === "/logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 flex flex-col justify-between'>
            {/* top: user info + menu */}
            <div>
                <div className='flex flex-col justify-center items-center gap-3 mt-3 mb-7'>
                    {user?.profileImageURL ? (
                        <img
                            src={user?.profileImageURL}
                            alt="Profile Image"
                            className='w-20 h-20 rounded-full shadow'
                        />
                    ) : (
                        <CharAvatar
                            fullName={user?.fullName}
                            width="w-20"
                            height="h-20"
                            style="text-xl"
                        />
                    )}
                    <h5 className='text-gray-900 font-medium leading-6'>
                        {user?.fullName || ""}
                    </h5>
                </div>

                {/* menu buttons */}
                {SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`
                            w-full flex items-center gap-4 text-[15px]
                            ${activeMenu === item.label ? "text-white bg-primary" : ""}
                            py-3 px-6 rounded-lg mb-3
                        `}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className='text-xl' />
                        {item.label}
                    </button>
                ))}
            </div>

            {/* bottom: developer credits */}
            <div className="mt-6 text-center text-[12px] text-gray-500 border-t border-gray-200/50 pt-3">
                <a
                    href='https://www.linkedin.com/in/sai-hiware-23b053286/' target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-blue-600 transition"
                >
                    Developed by <span className="font-semibold">Sai Hiware</span>
                </a>
                <p className="mt-1">© 2025 FinSight</p>

            </div>

        </div>
    );
};

export default SideMenu;
