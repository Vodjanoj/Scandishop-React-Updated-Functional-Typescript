import React, { Component } from "react";
import ProductList from "./ProductList";
import { withRouter } from "react-router-dom";
import classes from "./Category.module.css";
import { getProductsByCategory } from "../../graphql/queries";

class Category extends Component {
  state = {
    productsByCategory: [],
    categoryName: this.props.match.params.categoryName,
    error: false,
  };

  getData = (categoryName) => {
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

        this.setState((prevState) => {
          return {
            ...prevState,
            productsByCategory: loadedProductsByCat,
          };
        });
      } catch (error) {
        console.log(error);
        this.setState({ error: true });
      }
    };
    loadProductsByCatHandler();
  };

  componentDidMount() {
    const { match } = this.props;
    const categoryName = match.params.categoryName;

    this.getData(categoryName);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const categoryName = match.params.categoryName;

    if (categoryName !== prevProps.match.params.categoryName) {
      this.getData(categoryName);
      this.setState((prevState) => {
        return {
          ...prevState,
          categoryName: categoryName,
        };
      });
    }
  }
  render() {
    const { categoryName, productsByCategory, error } = this.state;
    if (error) {
      return <p>Sorry, something went wrong!</p>;
    }
    return (
      <>
        <h2 className={classes.name}>{categoryName}</h2>
        <ProductList productItems={productsByCategory} />
      </>
    );
  }
}

export default withRouter(Category);
