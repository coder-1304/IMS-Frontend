import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import "../../../styles/Auth/form.css";
import { useNavigate } from "react-router-dom";
import postData from "../../../API/postData";
import LoadingScreen from "../../Loading/loadingScreen";
import "./AddProducts.css";
import "../../../styles/buttons.css";
import Unauthorized from "../../Unauthorized/Unauthorized";

const AddProducts = () => {
  const [loading, setLoading] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const [productInfo, setProductInfo] = useState({
    productName: "",
    description: "",
    price: "",
    unitId: "Piece", // Seting the default unit to "Piece"
    quantity: "",
  });

  async function postAPI() {
    let { productName, price, unitId, quantity } = productInfo;
    if (!productName || !price || !unitId || !quantity) {
      alert("Please fill all fields");
      return;
    }
    if (price <= 0 || quantity <= 0) {
      alert("Available quantity and price must be more than 0");
      return;
    }
    setShowForm(false);
    setLoading(true);
    if (productInfo.unitId === "Piece") {
      productInfo.unitId = 1;
    } else if (productInfo.unitId === "Grams") {
      productInfo.unitId = 2;
    } else {
      productInfo.unitId = 3;
    }
    const requestBody = {
      productName: productInfo.productName,
      description: productInfo.description,
      price: parseFloat(productInfo.price),
      unitId: productInfo.unitId, // Seting the default unit to "Piece"
      quantity: parseInt(productInfo.quantity),
      shopId: parseInt(Cookies.get("shopId")),
    };
    const response = await postData("/addProduct", requestBody);
    if (response.success) {
      setProductAdded(true);
      setLoading(false);
    } else {
      setLoading(false);
      alert(
        "Failed: " +
          response.message +
          "\n" +
          "ErrorCode: " +
          response.errorCode
      );
      setShowForm(true);
    }
  }
  const handleChange = (e) => {
    const { name, value, id } = e.target;
    // const { id, value } = event.target;
    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };


  const addAnotherProduct = () => {
    setLoading(false);
    setProductAdded(false);
    setShowForm(true);
    setProductInfo({
      productName: "",
      description: "",
      price: "",
      unitId: "Piece",
      quantity: "",
    });
  };

  return (
    <>
      {productAdded ? (
        <div className="centerContainer">
          Product Added Successfully
          <br />
          <br />
          <button onClick={addAnotherProduct} className="btn-secondary">
            Add Another Product
          </button>
        </div>
      ) : null}
      {loading ? <LoadingScreen /> : null}
      {Cookies.get("role") != "Admin" ? (
        <Unauthorized message="Only Admin can add products" />
      ) : showForm ? (
        <div className="add-product-form">
          <h2>Add Product</h2>
          <form >
            <div className="form-group">
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={productInfo.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={productInfo.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price: (Per piece/Per KG/Per Litre)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={productInfo.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="unitId">Unit ID:</label>
              <select
                id="unitId"
                name="unitId"
                value={productInfo.unitId}
                onChange={handleChange}
                required
              >
                <option value="Piece">Piece</option>
                <option value="Grams">Grams</option>
                <option value="Millilitres">Millilitres</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">
                Available Quantity: (in Pieces/Grams/Millilitres)
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={productInfo.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" onClick={postAPI}>
              Add Product
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default AddProducts;
