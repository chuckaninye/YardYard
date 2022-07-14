import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "./../../components/PostItem";
import UserProducts from "../../components/UserProducts";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Dashboard = () => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  return (
    <div>
      <PostItem />
      <UserProducts data={data} queryDoc={queryDoc} isLastPage={isLastPage}/>
      
    </div>
  );
};

export default Dashboard;
