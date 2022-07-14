import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "./../forms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteProductStart } from "../../redux/Products/products.actions";
import "./styles.scss";
import Modal from "../Modal";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Product = ({
  pos,
  productImage,
  productName,
  productPrice,
  productDesc,
  productResults,
  userProducts,
  documentID,
  profilePic,
}) => {
  const dispatch = useDispatch();
  const [readMore, setReadMore] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [profileName, setProfileName] = useState();
  const [profileEmail, setProfileEmail] = useState();
  const { currentUser } = useSelector(mapState);

  if (profilePic)
    profilePic.then(function (response) {
      setProfileImg(response.photoURL);
      setProfileName(response.displayName);
      setProfileEmail(response.email);
    });

  const configModal = {
    profileImg,
    profileName,
    profileEmail,
    productName,
    productImage,
    productPrice,
  };

  if (
    !documentID ||
    !productImage ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  return (
    <div key={pos} className="product">
      <div className="product-content">
        <div className="product-img">
          <Link to={`/product/${documentID}`}>
            <img src={productImage} alt="product image" className="img" />
          </Link>
        </div>
      </div>
      <div className="product-info">
        <Link to={`/product/${documentID}`}>
          <h4 className="product-name">{productName}</h4>
        </Link>
        <h4 className="product-price">${productPrice}</h4>
      </div>
      <p className="product-desc">
        {readMore && productDesc.length > 200
          ? `${productDesc.substring(0, 200)}...`
          : productDesc}
        <button
          className={productDesc.length > 200 ? "read-more" : "hide-read-more"}
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "read more" : "show less"}
        </button>
      </p>
      {userProducts ? (
        <div className="product-btns">
          <Button
            type="button"
            onClick={() => dispatch(deleteProductStart(documentID))}
            className="delete-btn"
          >
            Delete
            <span className="btn-icons">
              <FontAwesomeIcon icon="trash-alt"></FontAwesomeIcon>
            </span>
          </Button>
        </div>
      ) : (
        ""
      )}
      {productResults ? (
        <div className="product-btns">
          {!currentUser ? (
            <Link to="/login" className="btn-link">
              <Button type="button" className="delete-btn">
                Message Seller
                <span className="btn-icons">
                  <FontAwesomeIcon icon="envelope"></FontAwesomeIcon>
                </span>
              </Button>
            </Link>
          ) : (
            <Button
              type="button"
              className="delete-btn"
              onClick={() => setIsOpen(true)}
            >
              Message Seller
              <span className="btn-icons">
                <FontAwesomeIcon icon="envelope"></FontAwesomeIcon>
              </span>
            </Button>
          )}

          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            {...configModal}
            profileName={profileName}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Product;
