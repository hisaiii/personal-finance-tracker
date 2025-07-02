import { useSplitwise } from "../../context/SplitwiseContext";

const Logout = () => {
  const { clearSplitwiseData } = useSplitwise();
useEffect(() => {
  console.log("LOGOUT: clearing token + splitwiseData");
  localStorage.removeItem("token");
  clearSplitwiseData();
}, []);


  return <Navigate to="/login" />;
};

export default Logout;
