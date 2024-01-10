import classes from "./ProductAttributesItem.module.css";

// @ts-ignore
const ProductAttributesItem = (props) => {
  const {
    orderItemId,
    attrName,
    value,
    displValue,
    cartOverlay,
    mainCart,
    isColor,
    onChangeAtr,
    selected,
  } = props;

  return (
    <>
      <label
        className={`${classes[`attribute-item`]} ${
          !isColor ? classes[`not-colored`] : ""
        } ${cartOverlay ? classes[`cart-overlay`] : ""} ${
          mainCart ? classes[`main-cart`] : ""
        }`}
        style={{
          backgroundColor: isColor && value,
          // @ts-ignore
          outline: value === "#FFFFFF" && "1px solid #000000",
          // @ts-ignore
          outlineOffset: value === "#FFFFFF" && "-1px",
        }}
      >
        <input
          type="radio"
          name={`${cartOverlay ? orderItemId + "_" + attrName : attrName} ${
            mainCart ? orderItemId + " main_cart" : ""
          }`}
          value={value}
          checked={
            selected.length > 0 && selected[0].selectedAttrItemId === displValue
          }
          disabled={cartOverlay || mainCart}
          onChange={onChangeAtr}
        ></input>
        <span
          className={classes.checkmark}
          style={{
            // @ts-ignore
            width: !isColor && !cartOverlay && "63px",
            // @ts-ignore
            height: !isColor && !cartOverlay && "45px",
          }}
        >
          {!isColor && value}
        </span>
      </label>
    </>
  );
};

export default ProductAttributesItem;
