import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import ProductResults from "../../components/ProductResults";
import { fetchProductsStart } from "../../redux/Products/products.actions";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Search = () => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const { filter } = useParams();

  useEffect(() => {
    dispatch(fetchProductsStart({ filter }));
  }, [filter]);
  
  return <ProductResults products={products} />;
};

export default Search;
