import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import "../../../styles/Auth/form.css";
import "../../../styles/common.css";
import { useNavigate } from "react-router-dom";
import postData from "../../../API/postData";
import LoadingScreen from "../../Loading/loadingScreen";
import "../AddProducts/AddProducts.css";
import "../../../styles/buttons.css";
import Unauthorized from "../../Unauthorized/Unauthorized";

const EditProduct = (props) => {
    const { Description, Price, ProductID, ProductName, Quantity, UnitId } =
        props.product;
    const { showProductsFunc } = props;
    const [loading, setLoading] = useState(false);
    const [productAdded, setProductAdded] = useState(false);
    const [showForm, setShowForm] = useState(true);

    if(Cookies.get("role")!="Admin"){
        alert("Only Admin can modify products");
        showProductsFunc();
    }

    const showProducts = () => {
        showProductsFunc();
    }
    const navigate = useNavigate();

    let tempUnitId = "Millilitres";
    if (UnitId === 1) {
        tempUnitId = "Piece";
    } else if (UnitId === 2) {
        tempUnitId = "Grams";
    }
    const [productInfo, setProductInfo] = useState({
        productName: ProductName,
        description: Description,
        price: Price,
        unitId: tempUnitId,
        quantity: Quantity,
    });




    async function postAPI() {
        let { productName, price, unitId, quantity } = productInfo;
        if (!productName || !price || !unitId || !quantity) {
            alert("Please fill all fields");
            return;
        }
        if (price <= 0 || quantity < 0) {
            alert("Available quantity and price must be more than 0");
            return;
        }
        setShowForm(false);
        setLoading(true);
        let unitIdStr;
        if (productInfo.unitId === "Piece") {
            unitIdStr = 1;
        } else if (productInfo.unitId === "Grams") {
            unitIdStr = 2;
        } else {
            unitIdStr = 3;
        }
        const requestBody = {
            productName: productInfo.productName,
            description: productInfo.description,
            price: parseFloat(productInfo.price),
            unitId: unitIdStr,
            quantity: parseInt(productInfo.quantity),
            shopId: parseInt(Cookies.get("shopId")),
            productId: ProductID,
        };
        const response = await postData("/editProduct", requestBody);
        if (response.success) {
            setProductAdded(true);
            setLoading(false);
            showProducts();
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

    useEffect(() => {
        if (productInfo.unitId === 1) {
            productInfo.unitId = "Piece";
        } else if (productInfo.unitId === 2) {
            productInfo.unitId = "Grams";
        } else {
            productInfo.unitId = "Millilitres";
        }
    }, [])


    return (
        <>
            {loading ? <LoadingScreen /> : null}
            { showForm ? (
                <div className="add-product-form">
                    <div className="centerContainer">
                    PRODUCT ID: {ProductID}
                    </div>
                    <h2>Edit Product</h2>
                    <form>
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
                            Save Changes
                        </button>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default EditProduct;
