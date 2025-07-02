import { useContext, useEffect } from "react";
import { SplitwiseContext } from "../context/SplitwiseContext";
import axiosInstance from "../utils/axiosInstance";

export const useSplitwiseAuth = () => {
  const { splitwiseData, setSplitwiseData, splitwiseLoading, setSplitwiseLoading } = useContext(SplitwiseContext);

  useEffect(() => {
    if (splitwiseData) return;

    let isMounted = true;
    setSplitwiseLoading(true);

    const fetchSplitwiseData = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/splitwise/me");
        if (isMounted && res.data && res.data.success) {
          setSplitwiseData(res.data);
        }
      } catch (err) {
        console.error("Splitwise data fetch error", err);
      } finally {
        if (isMounted) {
          setSplitwiseLoading(false);
        }
      }
    };

    fetchSplitwiseData();

    return () => {
      isMounted = false;
    };
  }, [splitwiseData, setSplitwiseData, setSplitwiseLoading]);
};
