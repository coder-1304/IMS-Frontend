import Cookies from "js-cookie";


function logout(){
    Cookies.remove("jwt_token");
    Cookies.remove("email");
    Cookies.remove("shopId");
    Cookies.remove("shopName");
    Cookies.remove("role");
    Cookies.remove("isLoggedIn");
    document.getElementById("user-email").textContent="";
    window.location.href="/";
}

export default logout;