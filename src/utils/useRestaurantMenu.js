// useRestaurantMenu.js
import { useState, useEffect } from "react";
import { MENU_API } from "./constant";

const useRestaurantMenu = (resId) => {
  const [restInfo, setRestInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${MENU_API}${resId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      
      console.log("API Response:", json);
      
      if (!json?.data) {
        throw new Error('No data received from API');
      }
      
      setRestInfo(json.data);
      console.log("Setting restInfo:", json.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a console log to check what's being returned
  console.log("Hook returning:", { restInfo, isLoading, error });

  return {
    restInfo,
    isLoading,
    error
  };
};

export default useRestaurantMenu;