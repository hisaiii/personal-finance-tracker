import { createContext, useContext, useState, useEffect } from "react";

export const SplitwiseContext = createContext();

export const useSplitwise = () => useContext(SplitwiseContext);

export const SplitwiseProvider = ({ children }) => {
  const [splitwiseData, setSplitwiseData] = useState(null);
  const [splitwiseLoading, setSplitwiseLoading] = useState(false);

  const clearSplitwiseData = () => {
    setSplitwiseData(null);
    localStorage.removeItem("splitwiseData");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // not logged in? clear splitwise too
      setSplitwiseData(null);
      localStorage.removeItem("splitwiseData");
    } else {
      const stored = localStorage.getItem("splitwiseData");
      if (stored) {
        setSplitwiseData(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (splitwiseData) {
      localStorage.setItem("splitwiseData", JSON.stringify(splitwiseData));
    }
  }, [splitwiseData]);

  return (
    <SplitwiseContext.Provider
      value={{
        splitwiseData,
        setSplitwiseData,
        splitwiseLoading,
        setSplitwiseLoading,
        clearSplitwiseData,
      }}
    >
      {children}
    </SplitwiseContext.Provider>
  );
};
