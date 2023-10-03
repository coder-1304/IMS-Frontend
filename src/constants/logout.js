import Cookies from "js-cookie";


function logout(){
    Cookies.remove("jwt_token");
    Cookies.remove("email");
    Cookies.remove("shopId");
    Cookies.remove("shopName");
    window.location.href="/";
}

export default logout;