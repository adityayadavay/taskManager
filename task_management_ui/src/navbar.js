import "./navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./service/authenticate";
import { useContext } from "react";
const Navbar = () => {
    const getLinkClassName = (isActive, isPending) => {
        return isPending ? "pending" : isActive ? "active" : ""
    }
    const { userName } = useContext(AuthContext);
    return (
        <>
            <div class="topnav">
                <NavLink active to={"/project/list"} className={({ isActive, isPending }) => getLinkClassName(isActive, isPending)} >Home</NavLink>
                <NavLink state={{ action: "logout" }} to={"/login"} className={({ isActive, isPending }) => getLinkClassName(isActive, isPending)} >Logout</NavLink>
                <NavLink to={"/project/update/3"} className={({ isActive, isPending }) => getLinkClassName(isActive, isPending)}>News</NavLink>
                {
                    userName ?
                        <div className="wlcUser">
                            Welcome {userName}
                        </div>
                        : null
                }
            </div>
        </>
    )
}

export default Navbar;