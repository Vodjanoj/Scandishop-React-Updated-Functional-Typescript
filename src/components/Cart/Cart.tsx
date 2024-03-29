import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { createSelector } from "reselect";
import classes from "./Cart.module.css";
import Backdrop from "../UI/Backdrop";
import CartItem from "./CartItem";
import { filterPrices } from "../Utils/filterPrices";
import { cartActions } from "../../store/cart-slice";
import { CartItem as StoreCartItem } from "../../store/cart-slice";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { Price } from "../../gql/graphql";

interface CartProps {
  cartOverlay?: boolean,
  onCloseCartOverlay?: ()=> void;
}

const cartItemsSelector = (state:RootState) => state.cart.items;
const totalQuantitySelector = (state:RootState) => state.cart.totalQuantity;
const setCurrSymbolSelector = (state:RootState) => state.currency.setCurrSymbol;

const cartDataSelector = createSelector(
  [cartItemsSelector, totalQuantitySelector, setCurrSymbolSelector],
  (items, totalQuantity, setCurrSymbol) => ({
    products: items,
    totalQuantity,
    setCurrSymbol,
  })
);

const Cart = (props: CartProps) => {
  const { cartOverlay, onCloseCartOverlay } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!cartOverlay) {
      window.scrollTo(0, 0);
    }
  }, [cartOverlay]);

  const { products, totalQuantity, setCurrSymbol } = useAppSelector((state) => cartDataSelector(state));
 
  const calcTotalPriceHandler = (currSymb: string, products: StoreCartItem[]) => {
     
    return products.reduce((sum, { prices, quantity }) => {
      const price: Price[] = filterPrices(prices, currSymb);
           
      if (price.length > 0) {
        return sum + price[0].amount * quantity;
      }
      return sum;
    }, 0);
  };
 
  const addItemHandler = (orderItem: StoreCartItem) => {
    dispatch(cartActions.addToCart(orderItem));
  };
 
  const removeItemHandler = (id:string) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const totalPrice = calcTotalPriceHandler(setCurrSymbol, products);

  let tax: number = Number((totalPrice * 0.21).toFixed(2));
 
  return (
    <>
      <div
        className={`${classes.cart} ${cartOverlay ? classes.overlay : ""}`}
        onClick={cartOverlay ? cartOverlay && ((e) => e.stopPropagation()) : undefined}
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
                  mainPicture={orderItem.gallery?.[0]}
                  mainCart={!cartOverlay}
                  cartOverlay={cartOverlay}
                  currPrice={filterPrices(orderItem.prices, setCurrSymbol)}  
                  selectedAttributes={orderItem.selectedAttributes}
                  onAdd={addItemHandler.bind(null, orderItem)}
                  onRemove={removeItemHandler.bind(null, orderItem.id)}
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
                <div className={classes["summary-count"]}>{totalQuantity}</div>
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
              <Link to={"#"}>
                <Button checkOut>
                  Check Out
                </Button>
              </Link>
            )}
            {!cartOverlay && (
              <Link to={"#"}>
                <Button order>
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
};

export default Cart;
