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
  const dispatch = useAppDispatch();
  const { items, error } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProducts(categoryName));
  }, [categoryName, dispatch]);

  console.log("items", items)
  console.log("error", error)


  if (error) {
    return <p>Sorry, something went wrong!</p>;
  }

   
  return (
    <>
      <h2 className={classes.name}>{categoryName}</h2>
      <ProductList productItems={items} />
    </>
  );
};

export default withRouter(Category);
