import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./../../assets/logo.png";
import Dropdown from "./../Dropdown";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = () => {
  const { currentUser } = useSelector(mapState);
  const [dropdown, setDropdown] = useState(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 500) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 500) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="YardYard" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <>
              <span className="nav-item">
                <Link to="/chats">
                  <FontAwesomeIcon icon="inbox" className="inbox" />
                </Link>
              </span>
              <span
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="nav-item"
              >
                <FontAwesomeIcon icon="user-circle" className="profile" />
                {dropdown && <Dropdown />}
              </span>
            </>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
