import "../styles/navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="navbar">

            <div className="rightNav">
                <FaBell className="icon"/>
                <FaUserCircle className="icon"/>
            </div>

        </div>
    );
};

export default Navbar;