import React, { Component } from "react";
import DOMPurify from "dompurify";
import ProductAttributes from "./ProductAttributes";
import { connect } from "react-redux";
import { filterPrices } from "../Utils/filterPrices";
import { getProductsById } from "../../graphql/queries";
import { getProductsAttributesById } from "../../graphql/queries";
import classes from "./ProductDetail.module.css";
import { withRouter } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import Gallery from "./Gallery";
import Button from "../UI/Button";

class ProductDetail extends Component {
  state = {
    productDetails: {},
    selectedImage: null,
    selectedAttributes: [],
    error: false,
  };

  selectAttrHandler = (attId, attItemId) => {
    const { selectedAttributes } = this.state;
    const updatedSelcAttr = selectedAttributes.map((attribute) =>
      attribute.id === attId
        ? { ...attribute, selectedAttrItemId: attItemId }
        : attribute
    );

    this.setState((prevState) => {
      return {
        ...prevState,
        selectedAttributes: updatedSelcAttr,
      };
    });
  };

  selectImageHandler = (image) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedImage: image,
      };
    });
  };

  addToCartHandler = () => {
    const { selectedAttributes } = this.state;
    const {
      id,
      brand,
      name,
      gallery,
      attributes,
      prices,
    } = this.state.productDetails;

    const idForCart = selectedAttributes.reduce(
      (collectAttr, currentAtrItem) =>
        collectAttr + "_" + currentAtrItem.selectedAttrItemId,
      ""
    );

    const { onAddToCart } = this.props;
    onAddToCart({
      id: id + idForCart,
      brand: brand,
      name: name,
      gallery: gallery,
      attributes: attributes,
      prices: prices,
      selectedAttributes: selectedAttributes,
      quantity: 1,
    });
  };

  componentDidMount() {
    const productId = this.props.match.params.productId;

    const loadProductDetailsHandler = async () => {
      try {
        const product = await getProductsById(productId);

        // A seperate query with fetchPolicy: "network-only" for getting attributes
        // of a product from a server, not from cache, by not getting the whole data of a product
        // from a server with each rendering of a component we save the network traffic.
        // If we get attributes from cache they are being mixed with attribites of other products,
        // so we have an issue with correct displaying of attributes associated to a specific product
        const attributes = await getProductsAttributesById(productId);

        const selectedAttributes = attributes.map((attribute) => ({
          id: attribute.id,
          name: attribute.name,
          selectedAttrItemId: attribute.items[0].id,
        }));

        this.setState((prevState) => {
          return {
            ...prevState,
            productDetails: { ...product, attributes },
            selectedImage: product.gallery[0],
            selectedAttributes: selectedAttributes,
          };
        });
      } catch (error) {
        this.setState({ error: true });
      }
    };
    loadProductDetailsHandler();
  }

  render() {
    const { selectedAttributes, error } = this.state;
    const {
      brand,
      name,
      gallery,
      attributes,
      prices,
      inStock,
      description,
    } = this.state.productDetails;

    const { selectedImage } = this.state;
    const { setCurrSymbol } = this.props;

    const sanitizedDescription = DOMPurify.sanitize(description);

    let price;
    if (prices && setCurrSymbol !== "") {
      const amount = filterPrices(prices, setCurrSymbol);
      price = amount[0].amount;
    }

    if (error) {
      return <p>Sorry, something went wrong</p>;
    }

    return (
      <>
        <div className={classes.card}>
          <Gallery
            onSelectImage={this.selectImageHandler}
            selectedImage={selectedImage}
            images={gallery}
            name={name}
            brand={brand}
          />
          <div className={classes.details}>
            <h1 className={classes.brand}>{brand}</h1>
            <h2 className={classes.name}>{name}</h2>
            {attributes && (
              <div className={classes.attributes}>
                {attributes.map((attribute, index) => (
                  <ProductAttributes
                    key={index + attribute.id}
                    attrName={attribute.name}
                    attrId={attribute.id}
                    attributes={attribute}
                    selectedAttributes={selectedAttributes}
                    onSelectAttr={this.selectAttrHandler}
                  />
                ))}
              </div>
            )}
            <div className={classes.price}>Price:</div>
            <div className={classes["current-price"]}>
              {setCurrSymbol}
              {price}
            </div>
            <Button disabled={!inStock} clicked={this.addToCartHandler}>
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <div
              className={classes.description}
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetail));
