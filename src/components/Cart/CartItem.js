import ProductAttributes from "../Products/ProductAttributes";
import classes from "./CartItem.module.css";
import ImageCarousel from "./ImageCarousel";

const CartItem = (props) => {
  const { symbol } = props.currPrice[0].currency;
  const { amount } = props.currPrice[0];
  const {
    mainCart,
    cartOverlay,
    brand,
    name,
    images,
    mainPicture,
    price,
    orderItemId,
    attributes,
    selectedAttributes,
    quantity,
    onAdd,
    onRemove,
  } = props;

  return (
    <>
      <li
        className={`${classes["cart-item"]} ${
          cartOverlay ? classes.overlay : ""
        }`}
      >
        <div className={classes.summary}>
          <div className={classes.details}>
            <div className={classes.brand}>{brand}</div>
            <div className={classes.name}>{name}</div>
            <span className={classes.price}>
              {price}
              {symbol}
              {amount}
            </span>
            <div>
              {attributes.map((attribute, index) => (
                <ProductAttributes
                  orderItemId={orderItemId}
                  key={index + attribute.id}
                  attrName={attribute.name}
                  attrId={attribute.id}
                  attributes={attribute}
                  selectedAttributes={selectedAttributes}
                  cartOverlay={cartOverlay}
                  mainCart={mainCart}
                />
              ))}
            </div>
          </div>
          <div className={classes.actions}>
            <div className={classes["add-item"]} onClick={onAdd}></div>
            <div className={classes.amount}>{quantity}</div>
            <div className={classes["delete-item"]} onClick={onRemove}></div>
          </div>
        </div>
        {mainCart && (
          <ImageCarousel brand={brand} name={name} images={images} />
        )}
        {cartOverlay && (
          <div className={classes.image}>
            <div className={classes["overlay-gray"]}></div>
            <img src={mainPicture} alt={brand + ", " + name}></img>
          </div>
        )}
      </li>
    </>
  );
};

export default CartItem;
