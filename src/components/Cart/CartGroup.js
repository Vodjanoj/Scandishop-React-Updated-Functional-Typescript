import { useRef, useState } from "react";
import { useEffect } from "react";
import cartIcon from "../../assets/cart-icon.png";
import Cart from "./Cart";
import classes from "./CartGroup.module.css";

const CartGroup = (props) => {
  const cartoverlayRef = useRef();
  const [cartOverlayIsShown, setCartOverlayIsShown] = useState(false);

  useEffect(() => {
    document.addEventListener("click", clickOutsideHandler);

    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, []);

  const toggleCartHandler = () => {
    setCartOverlayIsShown((prevState) => !prevState);
  };

  const closeCartOverlayHandler = () => {
    setCartOverlayIsShown(false);
  };

  const clickOutsideHandler = (event) => {
    const current = cartoverlayRef.current;

    if (!current.contains(event.target)) {
      setCartOverlayIsShown(false);
    }
  };

  const { totalQuantity } = props;

  return (
    <div
      ref={cartoverlayRef}
      className={classes.icon}
      onClick={toggleCartHandler}
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
        <Cart cartOverlay onCloseCartOverlay={closeCartOverlayHandler} />
      )}
    </div>
  );
};

export default CartGroup;
