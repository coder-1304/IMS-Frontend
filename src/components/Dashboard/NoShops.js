import "../../styles/buttons.css";
import "../../styles/Dashboard/NoShops.css"
import { useNavigate } from "react-router-dom";
const NoShops = () => {
    let navigate= useNavigate();
  return (
    <div className="noShops">
      <h3>You don't have any Shops yet</h3>
      <button onClick={()=>{
        navigate('/addShop')
      }} className="btn-secondary">Add Shop</button>
    </div>
  );
};
export default NoShops;
