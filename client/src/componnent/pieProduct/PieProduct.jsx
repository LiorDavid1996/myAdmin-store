import React from 'react'
import { UserData } from "../data";
import { useState } from 'react';

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title } from "chart.js/auto";

function PieProduct() {
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
    <div style={{height:"30vh",border:'1px solid black'}}>
      <Pie data={userData} options={{legend:{display:true, position:"right"}}}/>
    </div>
  )
}

export default PieProduct