import classes from "./ProductAttributesItem.module.css";
import { Maybe } from "../../gql/graphql";
import { selectedAttribute } from "../../store/cart-slice";

interface ProductAttributesItemProps {
  orderItemId?: string;
  attrName: Maybe<string> | undefined;
  value: Maybe<string> | undefined;
  displValue: Maybe<string> | undefined;
  cartOverlay?: boolean | undefined;
  mainCart?: boolean | undefined;
  isColor: boolean;
  selected: selectedAttribute[] | undefined;
  onChangeAtr: () => void;
}

const ProductAttributesItem = (props: ProductAttributesItemProps) => {
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
          backgroundColor: isColor && value ? value : undefined,
          outline: value === "#FFFFFF" ? "1px solid" : undefined,
          outlineOffset: value === "#FFFFFF" ? "-1px" : undefined,
        }}
      >
        <input
          type="radio"
          name={`${cartOverlay ? orderItemId + "_" + attrName : attrName} ${
            mainCart ? orderItemId + " main_cart" : ""
          }`}
          value={value ? value : undefined}
          checked={ 
            selected && 
            selected.length > 0 && 
            selected[0].selectedAttrItemId === displValue
          }
          disabled={cartOverlay || mainCart}
          onChange={onChangeAtr}
        ></input>
        <span
          className={classes.checkmark}
          style={{
            width: !isColor && !cartOverlay ? "63px" : undefined,
            height: !isColor && !cartOverlay ? "45px" : undefined,
          }}
        >
          {!isColor && value}
        </span>
      </label>
    </>
  );
};

export default ProductAttributesItem;
