import React, { useState } from "react";
import { MenuItems } from "./../MenuItems";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUserStart } from "./../../redux/User/user.actions";

import "./styles.scss";

const Dropdown = () => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              {item.path ? (
                <Link
                  className={item.cName}
                  to={item.path}
                  onClick={() => setClick(false)}
                >
                  {item.title}
                </Link>
              ) : (
                <a className={item.cName} onClick={() => signOut()}>
                  {item.title}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
