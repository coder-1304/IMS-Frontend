import Cookies from "js-cookie";
const verifyLogin = () => {
  if (!Cookies.get("isLoggedIn")) {
    return false;
  }
  return true;
};

export default verifyLogin;
