import React, { Component } from "react";
import { connect } from "react-redux";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";
import { filterPrices } from "../Utils/filterPrices";
import { cartActions } from "../../store/cart-slice";
import { getProductsAttributesById } from "../../graphql/queries";

class ProductList extends Component {
  state = {
    error: false,
  };

  addToCartHandler = (event, prodItem) => {
    event.preventDefault();

    const loadProductDetailsHandler = async () => {
      try {
        const attributes = await getProductsAttributesById(prodItem.id);

        const selectedAttributes = attributes.map((attribute) => ({
          id: attribute.id,
          name: attribute.name,
          selectedAttrItemId: attribute.items[0].id,
        }));

        const idForCart = selectedAttributes.reduce(
          (collectAttr, currentAtrItem) =>
            collectAttr + "_" + currentAtrItem.selectedAttrItemId,
          ""
        );

        const { onAddToCart } = this.props;

        onAddToCart({
          id: prodItem.id + idForCart,
          brand: prodItem.brand,
          name: prodItem.name,
          gallery: prodItem.gallery,
          attributes: attributes,
          prices: prodItem.prices,
          selectedAttributes: selectedAttributes,
          quantity: 1,
        });
      } catch (error) {
        console.log(error);
        this.setState({ error: true });
      }
    };
    loadProductDetailsHandler();
  };

  render() {
    const { error } = this.state;
    const { productItems, setCurrSymbol } = this.props;
    if (error) {
      return <p>Sorry, something went wrong!</p>;
    }
    return (
      <>
        <div className={classes.products}>
          {productItems.map((item, index) => (
            <ProductItem
              key={index + item.id}
              id={item.id}
              onAddToCart={(event) => this.addToCartHandler(event, item)}
              brand={item.brand}
              name={item.name}
              inStock={item.inStock}
              prices={item.prices}
              currPrice={filterPrices(item.prices, setCurrSymbol)}
              image={item.image}
            />
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setCurrSymbol: state.currency.setCurrSymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (item) => dispatch(cartActions.addToCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
