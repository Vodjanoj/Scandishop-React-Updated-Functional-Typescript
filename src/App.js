import   { Component } from "react";
import Layout from "./components/Layout/Layout";
import Category from "./components/Products/Category";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/Products/ProductDetail";
import { getCategories } from "./graphql/queries";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/UI/NotFound";

class App extends Component {
  state = {
    allCategory: [],
  };

  componentDidMount() {
    const loadAllCageriesHandler = async () => {
      try {
        const data = await getCategories();

        this.setState({
          allCategory: data[0].name,
        });
      } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
      }
    };
    loadAllCageriesHandler();
  }

  render() {
    const { allCategory } = this.state;
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact>
              {allCategory.length > 0 && (
                <Redirect to={`/categories/${allCategory}`} />
              )}
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
  }
}

export default App;
