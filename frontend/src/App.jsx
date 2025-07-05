import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SplitwiseDetails from "./pages/Dashboard/SplitwiseDetails";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import { UserProvider } from "./context/UserContext";
import { SplitwiseProvider } from "./context/SplitwiseContext"; // import kara
import { Toaster } from "react-hot-toast";
import Logout from "./pages/Auth/Logout";
import Recent from "./pages/Dashboard/Recent";
import AllTransactions from "./pages/Dashboard/AllTransactions";
const App = () => {
  return (
    <UserProvider>
      <SplitwiseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/splitwise-details" element={<SplitwiseDetails />} />
            <Route path="/all" element={<AllTransactions/>}/>

          </Routes>
        </Router>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </SplitwiseProvider>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
