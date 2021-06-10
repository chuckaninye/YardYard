import React from "react";
import HompePagePic from "./../../assets/homepage.jpg";
import "./styles.scss";
import SearchIcon from "@material-ui/icons/Search";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{ backgroundImage: `url(${HompePagePic})` }}
        >
          <div className="boxContainer">
            <table className="elementsContainer">
              <tbody>
                <tr>
                  <td>
                    <input
                      className="search"
                      type="search"
                      placeholder="Search"
                    />
                  </td>
                  <td>
                    <button className="search-btn">
                      <SearchIcon className="search-icon" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
