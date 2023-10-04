import Cookies from "js-cookie";
import "../../styles/common.css";


const Unauthorized = (props) => {
  return (
    <div className="centerContainer">
        <h4>Unauthorized: {props.message}</h4>
    </div>
  )
}
export default Unauthorized