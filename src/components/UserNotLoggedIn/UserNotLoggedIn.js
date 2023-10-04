import "../../styles/common.css"
import "../../styles/buttons.css"
import { useNavigate } from "react-router-dom"

const UserNotLoggedIn = () => {
    const navigate = useNavigate();
  return (
    <div style={{height:200}} className="centerContainer">
        <h2 >Please Login First</h2>
        <button className="btn-secondary" onClick={()=>{navigate("/")}}>Login</button>
    </div>
  )
}
export default UserNotLoggedIn