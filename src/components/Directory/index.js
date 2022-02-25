import React from "react";
import HompePagePic from "./../../assets/homepage.jpg";
import "./styles.scss";
import SearchBar from "./../SearchBar";
import FormInput from "./../forms/FormInput"
const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{ backgroundImage: `url(${HompePagePic})` }}
        >
          <div>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
