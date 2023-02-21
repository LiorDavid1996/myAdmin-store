import { UserData } from "../data";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import React from "react";
import { useState } from "react";

function BarOrders() {
  
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.day),
    datasets: [
      {
        label: "orders",
        data: UserData.map((data) => data.order),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  
  return (
      <div style={{height:"30vh" ,border:'1px solid black'}} >
<Bar data={userData} />
  </div>
  )

  ;
}

export default BarOrders;
