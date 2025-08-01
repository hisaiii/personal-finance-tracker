import React, { useState, useContext, useEffect } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import axiosInstance from '../../utils/axiosInstance.js';
import { UserContext } from '../../context/UserContext';
import { useSplitwise } from '../../context/SplitwiseContext';
import { toast } from 'react-hot-toast'
import { PiPlugsConnectedFill } from "react-icons/pi";
import { VscDebugDisconnect } from "react-icons/vsc";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const { splitwiseData, setSplitwiseData, splitwiseLoading, setSplitwiseLoading } = useSplitwise();

  // Check Splitwise status on mount
  const checkSplitwiseStatus = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/splitwise/status');
      if (response.data && response.data.connected) {
        setSplitwiseData(response.data);  // store in context
      } else {
        setSplitwiseData(null);
      }
    } catch (error) {
      console.log('Error checking Splitwise status:', error);
      setSplitwiseData(null);
    }
  };

  // Connect
  const handleSplitwiseConnect = () => {
    window.location.href = `${'https://personal-finance-tracker-8tdm.onrender.com'}/api/v1/splitwise/connect`;
  };

  // Disconnect
  const handleSplitwiseDisconnect = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/api/v1/splitwise/disconnect');
      if (response.data.success) {
        setSplitwiseData(null);
        toast.success("Disconnected successfully");
      }
    } catch (err) {
      console.log('Splitwise disconnect error', err);
      alert('Error while disconnecting Splitwise.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSplitwiseStatus();
  }, []);

  return (
    <div className='flex justify-between items-center gap-2 sm:gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] px-3 sm:px-7 py-4 sticky top-0 z-30'>
      
      {/* left: burger + title */}
      <div className='flex items-center gap-2 sm:gap-4 min-w-0 flex-1'>
        <button
          className='block lg:hidden text-black flex-shrink-0'
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? <HiOutlineX className='text-2xl' /> : <HiOutlineMenu className='text-2xl' />}
        </button>
        <h2 className="text-xl sm:text-3xl font-bold text-slate-800 tracking-tight drop-shadow-md truncate">
          Fin<span className="text-primary">Sight</span>
        </h2>
      </div>

      {/* right: connect / disconnect button */}
      <div className='flex-shrink-0'>
        {!splitwiseData ? (
          <button
            onClick={handleSplitwiseConnect}
            className={`flex justify-center items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 rounded-xl cursor-pointer font-semibold text-white text-sm sm:text-base ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            disabled={loading}
          >
            <PiPlugsConnectedFill className='text-lg sm:text-xl flex-shrink-0'/>
            <span className='hidden sm:inline'>
              {loading ? "Connecting..." : "Connect Splitwise"}
            </span>
            <span className='sm:hidden'>
              {loading ? "Connecting..." : "Splitwise"}
            </span>
          </button>
        ) : (
          <button
            onClick={handleSplitwiseDisconnect}
            className={`flex justify-center items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 rounded-xl cursor-pointer font-semibold text-white text-sm sm:text-base ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
            disabled={loading}
          >
            <VscDebugDisconnect className='text-lg sm:text-xl flex-shrink-0' />
            <span className='hidden sm:inline'>
              {loading ? "Disconnecting..." : "Disconnect Splitwise"}
            </span>
            <span className='sm:hidden'>
              {loading ? "Disconnecting..." : "Splitwise"}
            </span>
          </button>
        )}
      </div>

      {/* side menu */}
      {openSideMenu && (
        <div className='fixed top-[61px] -ml-4 bg-white'>
          <SideMenu />
        </div>
      )}
    </div>
  );
};

export default Navbar;