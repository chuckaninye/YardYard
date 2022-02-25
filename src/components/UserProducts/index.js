import React from "react";
import "./styles.scss";
import Product from "../Product";
import { useDispatch } from "react-redux";
import LoadMore from "./../LoadMore";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import { auth } from "./../../firebase/utils";

const UserProducts = ({ data, queryDoc, isLastPage }) => {
  const userProducts = true;
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({ startAfterDoc: queryDoc, persistProducts: data })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };
  return (
    <div className="products">
      <div className="container">
        <div className="product-items">
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map((product, pos) => {
              const {
                productName,
                productImage,
                productPrice,
                productDesc,
                documentID,
                productAdminUserUID,
              } = product;

              if (
                !productImage ||
                !productName ||
                typeof productPrice === "undefined"
              )
                return null;

              const configProduct = {
                pos,
                productImage,
                productName,
                productPrice,
                productDesc,
                userProducts,
                documentID,
              };

              return auth.currentUser &&
                productAdminUserUID === auth.currentUser.uid ? (
                <Product {...configProduct} />
              ) : (
                ""
              );
            })}
        </div>
        {!isLastPage && <LoadMore {...configLoadMore} />}
      </div>
    </div>
  );
};

export default UserProducts;
