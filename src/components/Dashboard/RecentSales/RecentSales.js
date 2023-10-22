import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import getData from "../../../API/getData";
import LoadingScreen from "../../Loading/loadingScreen";
import '../../../styles/common.css'
import './RecentSales.css'

const RecentSales = () => {
    let [salesData, setSalesData] = useState([]);
    let [loading, setLoading] = useState(true);
    const sale =
    {
        SaleID: 1,
        ProductID: 2,
        ShopID: 2,
        StaffEmail: "shanneeahirwar@gmail.com",
        SaleDate: "2023-10-02T02:19:00.000Z",
        SaleQuantity: 2,
        UnitID: 1,
        TotalAmount: "112.00",
    }
        ;
    useEffect(() => {
        async function recentSalesAPI() {
            const url = `/getSalesData/${Cookies.get("shopId")}`;
            const response = await getData(url);
            if (response.success) {
                let arrayOfObjects = [...response.result];
                arrayOfObjects.sort((a, b) => new Date(b.SaleDate) - new Date(a.SaleDate));
                setSalesData(arrayOfObjects);
                setLoading(false);
            } else {
                alert("Something went wrong")
            }

        }
        recentSalesAPI();
    }, []);
    return <>
        {loading ? <LoadingScreen /> :
            // <div className="centerContainer">
            <table className="sales-details-table">
                <thead>
                    <tr>
                        <th>Sale ID</th>

                        <th className="productNameColumn">Product Name [ID]</th>
                        <th>Staff Email</th>
                        <th>Sale Date</th>
                        <th>Sale Quantity</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.map((sale) => (
                        <SalesDetailsRow key={sale.SaleID} sale={sale} />
                    ))
                    }
                </tbody>
            </table>}
        <br /><br />
    </>;
};

const SalesDetailsRow = ({ sale }) => {
    // Converting SaleDate to a human-readable format
    // const saleDate = new Date(sale.SaleDate).toLocaleString();
    // Convert SaleDate to a Date object
    const saleDate = new Date(sale.SaleDate);

    // Increase the time by 78 minutes
    saleDate.setTime(saleDate.getTime() + 798 * 60 * 1000);

    // Convert the modified Date object to a formatted string
    const formattedSaleDate = saleDate.toLocaleString();
    let unitId = "Pieces";
    if (sale.UnitID === 2) {
        unitId = "Grams";
    } else if (sale.UnitID === 3) {
        unitId = "Millilitres";
    }

    return (
        <tr className="sales-details-row">
            <td>{sale.SaleID}</td>
            <td>{sale.ProductName} [{sale.ProductID}]</td>
            <td>{sale.StaffEmail}</td>
            <td>{formattedSaleDate}</td>
            <td>{sale.SaleQuantity} {unitId}</td>
            <td> ₹{sale.TotalAmount}</td>
        </tr>
    );
};


export default RecentSales;
