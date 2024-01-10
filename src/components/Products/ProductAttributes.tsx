import ProductAttributesItem from "./ProductAttributesItem";
import classes from "./ProductAttributes.module.css";


// @ts-ignore
const ProductAttributes = (props) => {
  const {
    cartOverlay,
    mainCart,
    attributes,
    attrId,
    attrName,
    onSelectAttr,
    orderItemId,
    selectedAttributes,
  } = props;

// @ts-ignore
  const findSelected = (attrItemId, attrId) => {
    const filteredAttrById = selectedAttributes.filter(
      // @ts-ignore
      (selectedAtr) =>
        selectedAtr.selectedAttrItemId === attrItemId &&
        selectedAtr.id === attrId
    );

    return filteredAttrById;
  };

  return (
    <>
      <div className={`${classes.name} ${cartOverlay ? classes.overlay : ""}`}>
        {attrName}:
      </div>
      <div
        className={`${classes["attribute-items"]} ${
          cartOverlay ? classes[`cart-overlay`] : ""
        }`}
      > 
        {attributes.items.map((
          // @ts-ignore
          attrItem, index) => (
          <ProductAttributesItem
            orderItemId={orderItemId}
            key={index + attrItem.id}
            index={index}
            displValue={attrItem.displayValue}
            attrName={attrName}
            selected={findSelected(attrItem.id, attrId)}
            isColor={attrName === "Color"}
            value={attrItem.value}
            onChangeAtr={() => onSelectAttr(attrId, attrItem.id)}
            cartOverlay={cartOverlay}
            mainCart={mainCart}
          />
        ))}
      </div>
    </>
  );
};

export default ProductAttributes;
