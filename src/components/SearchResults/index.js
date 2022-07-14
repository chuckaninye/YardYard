import React from "react";
import { useDispatch } from "react-redux";
import Product from "../Product";
import LoadMore from "../LoadMore";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import { auth, firestore } from "../../firebase/utils";

const SearchResults = ({ data, queryDoc, isLastPage, filter }) => {
  const productResults = true;
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filter,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
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

              if (auth.currentUser) {
                return productAdminUserUID !== auth.currentUser.uid ? (
                  <>
                    <Product {...configProduct} />
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

export default SearchResults;
