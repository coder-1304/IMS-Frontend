import LoadingScreen from "../../Loading/loadingScreen";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import "./SalesChart.css";
import getData from "../../../API/getData";
// import BarChart from "./BarChart";
import BarChartShow from "./BarChart";

const SalesChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function recentSalesAPI() {
      const url = `/getGroupedSalesData/${Cookies.get("shopId")}/10`;
      console.log("URL is: " + url);
      const response = await getData(url);
      if (response.success) {
        if(response.result.length==0){
            alert("No sales found for this shop!");
            return;
        }

      } else {
        alert("Something went wrong");
        return;
      }
      let result = response.result;
      const newResult = result.map((item) => ({
        ...item,
        Total_Sale_In_Rupee: parseFloat(item.Total_Sale_In_Rupee),
      }));
      setData(newResult);
      console.log(data);
    }
    recentSalesAPI();
    // console.log("Recent Sales");
  }, []);
  return <>{data.length !== 0 ? <BarChartShow data={data}/> : null}</>;
};
export default SalesChart;

// {
//   date_group: "2023-10-01T18:30:00.000Z";
//   total_amount: "2072.00";
// }
