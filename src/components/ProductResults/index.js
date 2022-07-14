import React from "react";
import { useDispatch } from "react-redux";
import Product from "./../Product";
import LoadMore from "./../LoadMore";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import { auth, firestore } from "./../../firebase/utils";

const ProductResults = ({ data, queryDoc, isLastPage }) => {
  const productResults = true;
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
          {data &&
            data.map((product, pos) => {
              console.log(product)
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
                productResults,
                documentID,
              };
              const getProfilePic = () => {
                return firestore
                  .collection("users")
                  .doc(productAdminUserUID)
                  .get()
                  .then((snapshot) => {
                    if (snapshot.exists) {
                      return snapshot.data()
                    }
                  });
              };

              if (auth.currentUser) {
                return productAdminUserUID !== auth.currentUser.uid ? (
                  <>
                    <Product {...configProduct} profilePic={getProfilePic()} />
                  </>
                ) : (
                  ""
                );
              } else {
                return <Product {...configProduct} />;
              }
            })}
        </div>
        {!isLastPage && <LoadMore {...configLoadMore} />}
      </div>
    </div>
  );
};

export default ProductResults;
