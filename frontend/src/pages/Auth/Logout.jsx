// import { useSplitwise } from "../../context/SplitwiseContext";

// const Logout = () => {
//   const { clearSplitwiseData } = useSplitwise();
// useEffect(() => {
//   localStorage.removeItem("token");
//   clearSplitwiseData();
// }, []);


//   return <Navigate to="/login" />;
// };

// export default Logout;

import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSplitwise } from "../../context/SplitwiseContext";
import axios from "axios";

const Logout = () => {
  const { clearSplitwiseData } = useSplitwise();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // ✅ tell server to destroy session + clear Redis cache
        await axios.post('/api/v1/auth/logout', {}, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
      } catch (err) {
        console.warn('Logout error:', err.message);
      } finally {
        // always clear local data even if API fails
        localStorage.removeItem("token");
        clearSplitwiseData();
      }
    };

    handleLogout();
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;