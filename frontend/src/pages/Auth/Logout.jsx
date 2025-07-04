import { useSplitwise } from "../../context/SplitwiseContext";

const Logout = () => {
  const { clearSplitwiseData } = useSplitwise();
useEffect(() => {
  localStorage.removeItem("token");
  clearSplitwiseData();
}, []);


  return <Navigate to="/login" />;
};

export default Logout;
