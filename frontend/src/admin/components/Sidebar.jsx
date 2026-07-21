import { FaTachometerAlt, FaUsers, FaBookOpen, FaPuzzlePiece, FaCommentDots, FaCog, FaSignOutAlt } from "react-icons/fa";
import "../styles/sidebar.css";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar glass">

      <div className="logo-area">
        <h2 className="logo">RAHASYA</h2>
        <p>ADMIN PANEL</p>
      </div>

      <nav className="nav flex-column">

        <NavLink to="/admin/dashboard" className="menu-link">
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink to="/admin/players" className="menu-link">
          <FaUsers />
          Players
        </NavLink>

        <NavLink to="/admin/chapters" className="menu-link">
          <FaBookOpen />
          Chapters
        </NavLink>

        <NavLink to="/admin/puzzles" className="menu-link">
          <FaPuzzlePiece />
          Puzzles
        </NavLink>

        <NavLink to="/admin/feedback" className="menu-link">
          <FaCommentDots />
          Feedback
        </NavLink>

        <NavLink to="/admin/settings" className="menu-link">
          <FaCog />
          Settings
        </NavLink>

      </nav>

      <button className="logout-btn">
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
};

export default Sidebar;