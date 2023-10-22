import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import LoadingScreen from "../../Loading/loadingScreen";
import getData from "../../../API/getData";
import postData from "../../../API/postData";
import { useNavigate } from "react-router-dom";
import "../../../styles/common.css";
import "./SellProducts.css";
import EditProduct from "../EditProduct/EditProduct";

const SellProducts = () => {
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [filteredProducts, setFiteredProducts] = useState(false);
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [showProductEditPage, setShowProductEditPage] = useState(false);
  const navigate = useNavigate();

  // const [quantityToSell, setQuantityToSell] = useState(0);

  async function sellProductAPI(productId, quantity) {
    setShowProducts(false);
    setLoading(true);
    const shopId = Cookies.get("shopId");
    const requestBody = {
      productId: productId,
      shopId: shopId,
      quantity: quantity
    }
    const response = await postData('/sellProduct', requestBody);
    if (response.success) {
      alert('Sold Successfully\n' + "Total Amount: " + response.totalAmount);
    } else {
      alert("Something went wrong");
    }
    httpReq();
  }

  const handleSellClick = async (productId) => {
    const quantity = document.getElementById(productId).value;
    if (!quantity) {
      alert("Please enter a quantity to sell");
      return;
    }
    if (quantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
    // return;
    const product = products.find((product) => product.ProductID === productId);
    if (parseFloat(product.Quantity) < parseFloat(quantity)) {
      alert("You can't sell more than the quantity you have in stock");
      return;
    } else {
      sellProductAPI(productId, quantity)
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowProductEditPage(true);
    setShowProducts(false);
  }

  const showProductsFunc = () => {
    setLoading(true);
    httpReq();
  }

  const handleSearch = () => {
    let searchText = document.getElementById("searchField").value;
    const filtered = products.filter((product) =>
      product.ProductName.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filtered.length === 0) {
      setNoSearchResult(true);
    } else {
      setNoSearchResult(false);
    }
    setFiteredProducts(filtered);
  };

  async function httpReq() {
    const shopId = Cookies.get("shopId");
    if (!shopId) {
      navigate("/shops");
      return;
    }
    const response = await getData(`/getProducts/${shopId}`);
    if (response.success) {
      if (response.result.length == 0) {
        setNoProducts(true);
      } else {
        setProducts(response.result);
        setFiteredProducts(response.result);
        setShowProducts(true);
      }
      setLoading(false);
    } else {
      // alert(
      //   "Failed: " +
      //   response.message +
      //   "\n" +
      //   "ErrorCode: " +
      //   response.errorCode
      // );
    }
  }
  useEffect(() => {
    httpReq();
  }, []);

  return (
    <div>
      {loading ? <LoadingScreen /> : null}

      {showProductEditPage ? <EditProduct product={selectedProduct} showProductsFunc={showProductsFunc} /> : null}
      {noProducts ? (
        <div className="centerContainer">
          No Products Added! Please Add Products
        </div>
      ) : null}
      {showProducts ? (
        <div className="centerContainer">
          <div className="product-search-container">
            <input
              type="text"
              className="product-search-input"
              placeholder="Search products..."
              // value={searchTerm}
              onChange={handleSearch}
              id="searchField"
              style={{ width: 250 }}
            />
            {/* <button className="product-search-button">Search</button> */}
          </div>
        </div>
      ) : null}
      {noSearchResult ? (
        <div className="centerContainer">
          <h4>{`Sorry, we couldn't find any results for "${document.getElementById("searchField").value
            }" `}</h4>
        </div>
      ) : null}
      {showProducts
        ? filteredProducts.map((product) => {
          const {
            Description,
            Price,
            ProductID,
            ProductName,
            Quantity,
            UnitId,
          } = product;

          let unit = "Pieces";
          if (UnitId == 2) {
            unit = "Grams";
          } else if (UnitId == 3) {
            unit = "Millilitres";
          }
          // const [quantityToSell, setQuantityToSell] = useState(0);

          return (
            <div className="product-card">
              <div className="product-details">
                <h3 className="product-name">{ProductName}</h3>
                <p className="product-description">{Description}</p>
              </div>
              <div className="product-quantity">
                <span className="quantity-label">Available Quantity:</span>{" "}
                <span className="available-quantity">{Quantity} {unit}</span>
              </div>
              <div className="product-price">
                <span className="price-label">Price:</span> <span className="price">₹{Price}</span>
              </div>
              <div className="sell-section">
                <input
                  style={{ width: 130 }}
                  type="number"
                  placeholder="Quantity to Sell"
                  className="quantity-input"
                  id={ProductID}
                />
                {Quantity != 0 ? <button
                  onClick={() => {
                    handleSellClick(ProductID);
                  }}
                  className="sell-button"
                >
                  Sell
                </button> : <button
                  className="out-of-stock-button"
                >
                  Out of Stock
                </button>}
              </div>
              <div className="product-id">
                <span className="id-label">ID:</span> {ProductID}
              </div>
              {Cookies.get("role") == "Admin" ? <button className="edit-button" onClick={() => { handleEditClick(product) }}>Edit Product</button> : null}
            </div>
          );
        })
        : null}
      <br />
      <br />
    </div>
  );
};
export default SellProducts;
