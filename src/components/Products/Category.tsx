import { useState } from "react";
import { useEffect } from "react";
import ProductList from "./ProductList";
import { withRouter, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import classes from "./Category.module.css";
import { getProducts } from "./../../store/product-actions";
import { RootState } from "../../store";

const Category = () => {
  let { categoryName } = useParams<{ categoryName: string }>();
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const productsByCategory = useAppSelector(
    (state: RootState) => state.products.items
  );

  useEffect(() => {
    dispatch(getProducts(categoryName));
  }, [categoryName, dispatch]);

  console.log(productsByCategory)

  if (error) {
    return <p>Sorry, something went wrong!</p>;
  }
  return (
    <>
      <h2 className={classes.name}>{categoryName}</h2>
      <ProductList productItems={productsByCategory} />
    </>
  );
};

export default withRouter(Category);
