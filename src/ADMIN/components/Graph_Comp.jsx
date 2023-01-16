import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Graph_Comp = ({ createdMonth, label }) => {
  const defaultData = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  for (let i = 0; i < createdMonth.length; i++) {
    if (defaultData.hasOwnProperty(createdMonth[i])) {
      defaultData[createdMonth[i]] += 1;
    }
  }

  let data = Object.entries(defaultData);

  return (
    <Line
      height={500}
      options={{
        maintainAspectRatio: false,
      }}
      data={{
        labels: data.map(([key, _]) => key),
        datasets: [
          {
            label,
            data: data.map(([_, value]) => value),
            borderColor: "#F273E6",
            borderCapStyle: "round",
            backgroundColor: "#E3ACF9",
            tension: 0.1,
            fill: true,
          },
        ],
      }}
    />
  );
};

export default Graph_Comp;
