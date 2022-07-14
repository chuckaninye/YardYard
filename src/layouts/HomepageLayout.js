import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import ProductResults from "./../components/ProductResults";
import { fetchProductsStart } from "./../redux/Products/products.actions";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const HomepageLayout = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();

  const { data, queryDoc, isLastPage } = products;

  console.log(products);

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

  console.log(data)

  return (
    <div className="fullHeight">
      <Header {...props} />
      {props.children}
      <ProductResults data={data} queryDoc={queryDoc} isLastPage={isLastPage} />
      <Footer />
    </div>
  );
};

export default HomepageLayout;
