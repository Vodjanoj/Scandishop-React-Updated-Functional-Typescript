import { useState } from "react";
import { useEffect } from "react";
import ProductList from "./ProductList";
import { withRouter, useParams, RouteComponentProps  } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import classes from "./Category.module.css";
import { useHistory} from "react-router-dom";
import { getProductsByCategory } from "../../graphql/queries";
import { createBrowserHistory } from 'history';
import { Product } from "../../gql/graphql";
import { getProducts } from './../../store/product-actions'
import { RootState } from "../../store";

interface CategoryProps extends RouteComponentProps {}

const Category = (props:CategoryProps) => {
  let { categoryName } = useParams<{ categoryName: string }>();
  const [productsByCategory, setProductsByCategory] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const productsByCategory1 = useAppSelector(
    (state: RootState) => state.products.items
  );
  
  // props.history.listen((location, action) => {
  //   console.log('Маршрут изменился:', location.pathname);
  //   dispatch(getProducts(categoryName));  
  // });
  

  // const getData = (categoryName: string) => {
  //   const loadProductsByCatHandler = async () => {
  //     try {
  //       const rawData = await getProductsByCategory(categoryName);

  //   if (rawData && Array.isArray(rawData)) { 
      
  //     const filteredData: Product[] = rawData.filter((item): item is Product => item !== null);

  //     setProductsByCategory(filteredData);
  //   }
  //     } catch (error) {
  //       console.log(error);
  //       setError(true);
  //     }
  //   };
  //   loadProductsByCatHandler();
  // };

  useEffect(() => {
    // getData(categoryName);
    dispatch(getProducts(categoryName));
  }, [categoryName]);

  if (error) {
    return <p>Sorry, something went wrong!</p>;
  }
  return (
    <>
      <h2 className={classes.name}>{categoryName}</h2>
      <ProductList productItems={productsByCategory1} />
    </>
  );
};

export default withRouter(Category);
