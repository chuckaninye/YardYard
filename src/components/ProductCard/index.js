import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import Button from "./../forms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import { firestore } from "./../../firebase/utils";
import "./styles.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});

const mapStateUser = ({ user }) => ({
  currentUser: user.currentUser,
});

const ProductCard = ({ profilePic }) => {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  const { currentUser } = useSelector(mapStateUser);
  const [isOpen, setIsOpen] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [profileName, setProfileName] = useState();
  const [profileEmail, setProfileEmail] = useState();

  const {
    productName,
    productImage,
    productPrice,
    productDesc,
    productAdminUserUID,
  } = product;

    useEffect(() => {
      return firestore
        .collection("users")
        .doc(productAdminUserUID)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setProfileImg(snapshot.data().photoURL);
            setProfileName(snapshot.data().displayName);
            setProfileEmail(snapshot.data().email);
          }
        });
    }, [product]);


  const configModal = {
    profileImg,
    profileName,
    profileEmail,
    productName,
    productImage,
    productPrice,
  };

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productImage} className="card-img" />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>${productPrice}</span>
          </li>
          <li>
            {!currentUser ? (
              <Link to="/registration" className="btn-link">
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
            >
              Send A Message To {profileName}
            </Modal>
          </li>
          <li>
            <span className="desc">{productDesc}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
