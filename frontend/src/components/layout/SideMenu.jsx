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
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-3 sm:p-5 sticky top-[61px] z-20 flex flex-col justify-between overflow-y-auto'>
            {/* top: user info + menu */}
            <div>
                <div className='flex flex-col justify-center items-center gap-2 sm:gap-3 mt-2 sm:mt-3 mb-4 sm:mb-7'>
                    {user?.profileImageURL ? (
                        <img
                            src={user?.profileImageURL}
                            alt="Profile Image"
                            className='w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow'
                        />
                    ) : (
                        <CharAvatar
                            fullName={user?.fullName}
                            width="w-16 sm:w-20"
                            height="h-16 sm:h-20"
                            style="text-lg sm:text-xl"
                        />
                    )}
                    <h5 className='text-gray-900 font-medium leading-6 text-sm sm:text-base text-center px-2'>
                        {user?.fullName || ""}
                    </h5>
                </div>

                {/* menu buttons */}
                {SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`
                            w-full flex items-center gap-3 sm:gap-4 text-sm sm:text-[15px]
                            ${activeMenu === item.label ? "text-white bg-primary" : ""}
                            py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg mb-2 sm:mb-3
                            hover:bg-gray-50 transition-colors
                        `}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className='text-lg sm:text-xl flex-shrink-0' />
                        <span className='truncate'>{item.label}</span>
                    </button>
                ))}
            </div>

            {/* bottom: developer credits */}
            <div className="mt-4 sm:mt-6 text-center text-[11px] sm:text-[12px] text-gray-500 border-t border-gray-200/50 pt-2 sm:pt-3 px-2">
                <a
                    href='https://www.linkedin.com/in/sai-hiware-23b053286/' 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-blue-600 transition block"
                >
                    Developed by <span className="font-semibold">Sai Hiware</span>
                </a>
                <p className="mt-1 text-[10px] sm:text-[11px]">© 2025 FinSight</p>
            </div>
        </div>
    );
};

export default SideMenu;