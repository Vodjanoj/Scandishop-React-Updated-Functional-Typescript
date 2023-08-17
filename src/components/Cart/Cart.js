import  { Component } from "react";
import { connect } from "react-redux";
import classes from "./Cart.module.css";
import Backdrop from "../UI/Backdrop";
import CartItem from "./CartItem";
import { filterPrices } from "../Utils/filterPrices";
import { cartActions } from "../../store/cart-slice";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

class Cart extends Component {
  componentDidMount() {
    if (!this.props.cartOverlay) {
      window.scrollTo(0, 0);
    }
  }

  calcTotalPriceHandler = (currSymb, products) => {
    return products.reduce((sum, { prices, quantity }) => {
      const price = filterPrices(prices, currSymb);

      if (price.length > 0) {
        return sum + price[0].amount * quantity;
      }
      return sum;
    }, 0);
  };

  addItemHandler = (orderItem) => {
    this.props.onAddToCart(orderItem);
  };

  removeItemHandler = (id) => {
    this.props.onAddRemoveFromCart(id);
  };

  render() {
    const {
      cartOverlay,
      setCurrSymbol,
      products,
      totalQuantity,
      onCloseCartOverlay,
    } = this.props;

    const totalPrice = this.calcTotalPriceHandler(setCurrSymbol, products);

    let tax = (totalPrice * 0.21).toFixed(2);

    return (
      <>
        <div
          className={`${classes.cart} ${cartOverlay ? classes.overlay : ""}`}
          onClick={cartOverlay && ((e) => e.stopPropagation())}
        >
          <div className={classes.inner}>
            {!cartOverlay && <h2 className={classes.title}>Cart</h2>}
            {!cartOverlay && totalQuantity < 1 && (
              <div className={classes["empty-info"]}>
                <span className={classes.bag}>Cart is empty</span>
                <p>Looks like you have not made a choice yet.</p>
              </div>
            )}

            {cartOverlay && (
              <h2 className={classes.title}>
                <span className={classes.bag}>My Bag</span>
                {totalQuantity > 0 ? `, ${totalQuantity} items` : " is empty"}
              </h2>
            )}
            {products.length > 0 && (
              <ul className={classes.items}>
                {products.map((orderItem, index) => (
                  <CartItem
                    orderItemId={orderItem.id}
                    key={index + orderItem.id}
                    attributes={orderItem.attributes}
                    name={orderItem.name}
                    brand={orderItem.brand}
                    quantity={orderItem.quantity}
                    images={orderItem.gallery}
                    mainPicture={orderItem.gallery[0]}
                    mainCart={!cartOverlay}
                    cartOverlay={cartOverlay}
                    currPrice={filterPrices(orderItem.prices, setCurrSymbol)}
                    selectedAttributes={orderItem.selectedAttributes}
                    onAdd={this.addItemHandler.bind(null, orderItem)}
                    onRemove={this.removeItemHandler.bind(null, orderItem.id)}
                  />
                ))}
              </ul>
            )}
            {!cartOverlay && (
              <div className={classes["order-summary"]}>
                <div className={classes["order-tax"]}>
                  <div className={classes["summary-title"]}>Tax 21%:</div>
                  <div className={classes["summary-count"]}>
                    {setCurrSymbol}
                    {tax}
                  </div>
                </div>
                <div className={classes["order-quantity"]}>
                  <div className={classes["summary-title"]}>Quantity:</div>
                  <div className={classes["summary-count"]}>
                    {totalQuantity}
                  </div>
                </div>

                <div className={classes["order-price"]}>
                  <div className={classes.total}>Total</div>
                  <div className={classes.price}>
                    {setCurrSymbol}
                    {totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
            {cartOverlay && (
              <div className={classes["order-summary-overlay"]}>
                <div className={classes.total}>Total:</div>
                <div className={classes.price}>
                  {setCurrSymbol}
                  {totalPrice.toFixed(2)}
                </div>
              </div>
            )}

            <div className={classes["order-controls"]}>
              {cartOverlay && (
                <Link to={"/cart"}>
                  <Button viewBag clicked={onCloseCartOverlay}>
                    View Bag
                  </Button>
                </Link>
              )}
              {cartOverlay && (
                <Link to={"/checkout"}>
                  <Button checkOut clicked={onCloseCartOverlay}>
                    Check Out
                  </Button>
                </Link>
              )}
              {!cartOverlay && (
                <Link to={"/order"}>
                  <Button order clicked={onCloseCartOverlay}>
                    Order
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {cartOverlay && <Backdrop />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.cart.items,
    totalQuantity: state.cart.totalQuantity,
    setCurrSymbol: state.currency.setCurrSymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (item) => dispatch(cartActions.addToCart(item)),
    onAddRemoveFromCart: (id) => dispatch(cartActions.removeFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
