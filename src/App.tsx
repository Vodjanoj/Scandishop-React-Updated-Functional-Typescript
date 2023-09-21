import { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Category from "./components/Products/Category";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/Products/ProductDetail";
import { getCategories } from "./graphql/queries";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/UI/NotFound";

const App = () => {
  const [allCategory, setAllCategory] = useState<string>("");

  useEffect(() => {
    const loadAllCageriesHandler = async () => {
      try {
        const data = await getCategories();

        const categoryName = data?.[0]?.name || "";

        setAllCategory(categoryName);
      } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
      }
    };
    loadAllCageriesHandler();
  }, []);

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact>
            {allCategory && <Redirect to={`/categories/${allCategory}`} />}
          </Route>
          <Route path="/categories/:categoryName/" exact>
            <Category />
          </Route>
          <Route path="/categories/:categoryName/:productId">
            <ProductDetails />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
