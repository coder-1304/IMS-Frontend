import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../../styles/common.css";

// Reference:  https://recharts.org/en-US/examples/BarChartNoPadding

const BarChartShow = (props) => {
  const data = props.data;

  return (
    <div className="centerContainer">
      <BarChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="Total_Sale_In_Rupee"
          fill="#393E46"
          background={{ fill: "#EEEEEE" }}
        />
      </BarChart>
    </div>
  );
};
export default BarChartShow;
