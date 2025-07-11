import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function useLogout() {
    const navigate = useNavigate()

    const logout = () => {
        Cookies.remove("token")
        navigate("/login")
    }

    return logout
}