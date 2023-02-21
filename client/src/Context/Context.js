import React, { useContext, useState, useEffect, createContext } from "react";
import summaryServices from '../Services/summary'

import axios from "axios";

const StateContext = createContext();

export default  function ContextProvider({ children }) {
  // Initialize state
  const [data, setData] = useState("ll");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    summaryServices().then(res=> setData(res.message))

  }, []);
 

  return (
    <StateContext.Provider value={{ data }} loading={isLoading}>
      {children}
    </StateContext.Provider>
  );
}
