import React, { useState, useParams } from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => {
  const [filter, setFilter] = useState("");
  const history = useHistory();

  const handleFilters = (e) => {
      history.push(`/search/${filter}`)
  };

  return (
    <div className="search-wrap">
      <div className="search-container">
        <input className="input-box" type="text" placeholder="Search..." onChange={(e) => setFilter(e.target.value)} />
        <a onClick={() => handleFilters()}>
          <FontAwesomeIcon icon="search"></FontAwesomeIcon>
        </a>
      </div>
    </div>
  );
};

export default SearchBar;
