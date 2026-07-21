import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

const AdminLayout = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;