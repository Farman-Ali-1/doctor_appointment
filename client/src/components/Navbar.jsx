import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import jwt_decode from "jwt-decode";
import logo from "./../images/logo.jpeg";


const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : ""
  );

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const role = localStorage.getItem("role");

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
      <div className="top-container">
      <div className="left-content">
      <div className="logo-container">
        <h2 className="nav-logo1">
          <NavLink to={"/"}>
            <img src={logo} alt="Virtual Care Logo" /> {/* Use logo image */}
          </NavLink>
        </h2>
        <h2 className="nav-logo">
          <NavLink to={"/"}>Virtual Care</NavLink>
        </h2>
        </div>
        </div>
        <div className="right-content">
      <ul className="links-container">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/doctors"}>Doctors</NavLink>
          </li>
          {token && user.isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"}>Dashboard</NavLink>
            </li>
          )}
          {token && !user.isAdmin && (
            <>
              { role !== 'Lab Assistant' && (
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>
              )}
              <li>
                <NavLink to={"/notifications"}>Notifications</NavLink>
              </li>
              <li>
                <HashLink to={"/#contact"}>Contact Us</HashLink>
              </li>
              {role !== 'Client' && role !== 'Doctor' && (
                <>
              <li>
                <NavLink to={"/mylab"}>My Lab</NavLink>
              </li>
              <li>
                <NavLink to={"/labreports"}>Lab Reports</NavLink>
              </li>
              </>
              )}
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
              {role !== 'Client' && role !== 'Lab Assistant' &&(
              <li>
                <NavLink to={"/prescriptions"}>Prescription</NavLink>
              </li>
             )}
              <li>
                <NavLink to={"/history"}>History</NavLink>
              </li>
            </>
          )}
          {!token ? (
            <>
              <li>
                <NavLink
                  className="btn"
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="btn"
                  to={"/register"}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span
                className="btn"
                onClick={logoutFunc}
              >
                Logout
              </span>
            </li>
          )}
        </ul>
        </div>
        </div>
      </nav>
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
