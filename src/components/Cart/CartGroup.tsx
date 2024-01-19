import { useRef, useState } from "react";
import { useEffect } from "react";
import cartIcon from "../../assets/cart-icon.png";
import Cart from "./Cart";
import classes from "./CartGroup.module.css";

interface CartGroupProps {
  totalQuantity: number;
}

const CartGroup = (props: CartGroupProps) => {
  const cartoverlayRef =  useRef<HTMLInputElement>(null);;
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

  const clickOutsideHandler = (event: MouseEvent) => {
    const current = cartoverlayRef.current;
    if (current) {
      if (!current.contains(event.target as Node)) {
        setCartOverlayIsShown(false);
      }
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
