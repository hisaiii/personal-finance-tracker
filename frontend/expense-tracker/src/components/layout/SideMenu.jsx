import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/charAvtar';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white  border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
            <div className='flex flex-col justify-center items-center gap-3 mt-3 mb-7'>
                {user?.profileImageURL ? (
                    <img
                        src={user?.profileImageURL || ""}
                        alt="Profile Image"
                        className='w-20 h-20 bg-slate-400 rounded-full' 
                    /> 
                ) :(
                      <CharAvatar
                      fullName={user?.fullName}
                      width="w-20"
                      height="h-20"
                      style="text-xl"
                      />

                )}

                <h5 className='text-grey-950 font-medium leading-6'>
                    {user?.fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => {
                return (
                    <button
                        key={`menu_${index}`}    //eg menu_01
                        className={`w-full flex items-center gap-4 text-[15px] ${
                            activeMenu === item.label ? "text-white bg-primary" : ""
                        } py-3 px-6 rounded-lg mb-3`}   //Agar user jis page pe hai wo hi item ka label hai ⇒ us item ko highlight kar do.



                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className='text-xl' />
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

export default SideMenu;
