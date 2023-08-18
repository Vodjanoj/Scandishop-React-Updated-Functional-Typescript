import ProductAttributesItem from "./ProductAttributesItem";
import classes from "./ProductAttributes.module.css";

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

  const findSelected = (attrItemId, attrId) => {
    const filteredAttrById = selectedAttributes.filter(
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
        {attributes.items.map((attrItem, index) => (
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
