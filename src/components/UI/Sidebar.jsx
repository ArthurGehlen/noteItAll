// Hooks
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Utils
import "./Sidebar.css";
import { useAuth } from "../../context/AuthProvider";

// Images
import logo from "../../assets/logo.svg";
import sidebar_arrow from "../../assets/sidebar_arrow.svg";
// Images - Links
import home_icon from "../../assets/home_icon.svg";
import my_notes_icon from "../../assets/my_notes_icon.svg";
import favorites_icon from "../../assets/favorites_icon.svg";
import logout_icon from "../../assets/logout_icon.svg";

// criei isso pra ser um pouco mais organizado...
const links = [
  { id: 1, link_name: "Home", path: "/home", img: home_icon },
  { id: 2, link_name: "Minhas Notas", path: "/my-notes", img: my_notes_icon },
  { id: 3, link_name: "Favoritos", path: "/favorites", img: favorites_icon },
];

const Sidebar = ({ current_link }) => {
  const { logout } = useAuth();
  const [isSidebarActive, setIsSidebarActive] = useState(true);

  const screen_width = window.innerWidth;

  useEffect(() => {
    if (screen_width <= 618) setIsSidebarActive(false);
  }, []);

  return (
    <div className={isSidebarActive ? "sidebar" : "sidebar_hidden"}>
      <header className="sidebar_header">
        <div className="sidebar_logo">
          <img src={logo} alt="Logo" />
          <h2>NoteItAll</h2>
        </div>

        <ul className="sidebar_links">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className={current_link == link.link_name ? "active_link" : ""}
              >
                <span>{link.link_name}</span>{" "}
                <img
                  src={link.img}
                  className={`${link.link_name
                    .toLowerCase()
                    .replace(/\s+/g, "_")}_logo`}
                  alt={`${link.link_name} Icon`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </header>

      {/* na hora do design eu n pensei nisso kkkkk */}
      <button
        className="toggle_sidebar_btn"
        onClick={() => setIsSidebarActive(!isSidebarActive)}
      >
        <img
          src={sidebar_arrow}
          alt="Active"
          style={{
            isSidebarActive: { transform: "rotate(-180deg)" },
          }} /* eu juro q n sei como isso funcionou... mas funcionou :) */
        />
      </button>

      <button onClick={logout} className="logout">
        <span>Logout</span>
        <img src={logout_icon} alt="Icon" />
      </button>
    </div>
  );
};

export default Sidebar;
