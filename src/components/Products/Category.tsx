import { useState } from "react";
import { useEffect } from "react";
import ProductList from "./ProductList";
import { withRouter, useParams } from "react-router-dom";
import classes from "./Category.module.css";
import { getProductsByCategory } from "../../graphql/queries";
import { Product } from "../../gql/graphql";

const Category = () => {
  let { categoryName } = useParams<{ categoryName: string }>();
  const [productsByCategory, setProductsByCategory] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  const getData = (categoryName: string) => {
    const loadProductsByCatHandler = async () => {
      try {
        const rawData = await getProductsByCategory(categoryName);

    if (rawData && Array.isArray(rawData)) { 
      
      const filteredData: Product[] = rawData.filter((item): item is Product => item !== null);

      setProductsByCategory(filteredData);
    }
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    loadProductsByCatHandler();
  };

  useEffect(() => {
    getData(categoryName);
  }, [categoryName]);

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
