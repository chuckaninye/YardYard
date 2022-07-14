import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SearchResults from "../../components/SearchResults";
import { fetchProductsStart } from "../../redux/Products/products.actions";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Search = () => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const { filter } = useParams();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filter }));
  }, [filter]);
  
  return (
    <SearchResults data={data} queryDoc={queryDoc} isLastPage={isLastPage} filter={filter}/>
  );
};

export default Search;
