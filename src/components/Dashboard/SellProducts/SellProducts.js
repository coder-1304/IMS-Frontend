import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import LoadingScreen from "../../Loading/loadingScreen";
import getData from "../../../API/getData";


const SellProducts = () => {
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  useEffect(() => {
    async function httpReq() {
      setLoading(false);
      const response = await getData(`/getProducts/${Cookies.get("shopId")}`);
      if (response.success) {
        if (response.result.length == 0) {
          setNoProducts(true);
        } else {
          setShowProducts(true);
        }
      } else {
        alert(
          "Failed: " +
            response.message +
            "\n" +
            "ErrorCode: " +
            response.errorCode
        );
      }
    }
    httpReq();
  }, []);

  return <div>
    {loading?<LoadingScreen/>:null}
    {noProducts? <h2>No Products for this shop</h2>:null}
    {showProducts? <h2>Showing Products</h2>:null}
  </div>;
};
export default SellProducts;
