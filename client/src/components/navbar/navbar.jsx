import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { localStorageUser } from "../../utils/globalConstants";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
const tabs = [
  {
    page: "home",
    path: "/",
  },
  {
    page: "issues",
    path: "/issues",
  },
  {
    page: "pending",
    path: "/pending",
  },
  {
    page: "completed",
    path: "/completed",
  },
  {
    page: "profile",
    path: "/profile",
  },
];
function Navbar() {
  const navigate = useNavigate();
  const lougout = () => {
    localStorage.removeItem(localStorageUser);
    navigate("/login");
  };

  const [selectedTab, setSelectedTab] = useState(null);

  return (
    <div className='navbar'>
      <Link to='/' className='logo'>
        <img src='/logo.png' alt='Civic Connect' />
      </Link>
      <div className='menu'>
        <ul>
          {tabs.map((tab, index) => {
            return (
              <Link to={tab.path} key={index}>
                <li key={tab} onMouseEnter={() => setSelectedTab(tab.page)}>
                  <motion.span
                    animate={{ color: tab.page === selectedTab ? "#EB00FF" : "#fff" }}
                    transition={{ duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.1 }}>
                    {tab.page}
                  </motion.span>
                  {tab.page === selectedTab && (
                    <motion.div
                      className='navbar-dot'
                      layoutId='navbar-dot'
                      transition={{ type: "ease-in-out", duration: 0.4 }}></motion.div>
                  )}
                </li>
              </Link>
            );
          })}
        </ul>
        <button className="logout-btn" onClick={lougout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
