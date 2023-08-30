import { useState } from "react";
import { useEffect } from "react";
import ProductList from "./ProductList";
import { withRouter, useParams } from "react-router-dom";
import classes from "./Category.module.css";
import { getProductsByCategory } from "../../graphql/queries";

const Category = () => {
  let { categoryName } = useParams();
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [error, setError] = useState(false);

  console.log("categoryName", categoryName);

  const getData = (categoryName) => {
    const loadProductsByCatHandler = async () => {
      try {
        const data = await getProductsByCategory(categoryName);
        const loadedProductsByCat = [];

        for (const key of data) {
          loadedProductsByCat.push({
            id: key.id,
            brand: key.brand,
            name: key.name,
            inStock: key.inStock,
            image: key.gallery[0],
            prices: key.prices,
            gallery: key.gallery,
          });
        }

        setProductsByCategory(loadedProductsByCat);
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
