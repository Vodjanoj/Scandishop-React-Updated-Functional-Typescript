import React, { Component } from "react";
import cartIcon from "../../assets/cart-icon.png";
import Cart from "./Cart";
import classes from "./CartGroup.module.css";

class CartGroup extends Component {
  cartoverlayRef = React.createRef();
  state = {
    cartOverlayIsShown: false,
  };

  componentDidMount() {
    document.addEventListener("click", this.clickOutsideHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickOutsideHandler);
  }

  toggleCartHandler = () => {
    this.setState((prevState) => {
      return { cartOverlayIsShown: !prevState.cartOverlayIsShown };
    });
  };

  closeCartOverlayHandler = () => {
    this.setState({ cartOverlayIsShown: false });
  };

  clickOutsideHandler = (event) => {
    const current = this.cartoverlayRef.current;

    if (!current.contains(event.target)) {
      this.setState({ cartOverlayIsShown: false });
    }
  };

  render() {
    const { totalQuantity } = this.props;
    const { cartOverlayIsShown } = this.state;
    return (
      <div
        ref={this.cartoverlayRef}
        className={classes.icon}
        onClick={this.toggleCartHandler}
      >
        <img
          className={classes["cart-icon"]}
          src={cartIcon}
          alt="Shopping art"
        ></img>
        {totalQuantity > 0 && (
          <span className={classes["products-count"]}>{totalQuantity}</span>
        )}
        {cartOverlayIsShown && (
          <Cart cartOverlay onCloseCartOverlay={this.closeCartOverlayHandler} />
        )}
      </div>
    );
  }
}

export default CartGroup;
