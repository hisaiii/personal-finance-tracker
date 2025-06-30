import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;
