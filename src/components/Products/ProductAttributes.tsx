import ProductAttributesItem from "./ProductAttributesItem";
import classes from "./ProductAttributes.module.css";
import { Maybe, AttributeSet } from "../../gql/graphql";
import { selectedAttribute } from "../../store/cart-slice";

interface ProductAttributesProps {
  attrName: Maybe<string> | undefined;
  attrId: Maybe<string> | undefined;
  cartOverlay?: boolean | undefined;
  mainCart?: boolean | undefined;
  attributes: Maybe<AttributeSet>;
  orderItemId?: string;
  selectedAttributes: selectedAttribute[] | undefined;
  onSelectAttr?: (
    attrId: Maybe<string> | undefined,
    attrItId: Maybe<string> | undefined
  ) => void;
}

const ProductAttributes = (props: ProductAttributesProps) => {
  const {
    cartOverlay,
    mainCart,
    attributes,
    attrId,
    attrName,
    orderItemId,
    selectedAttributes,
    onSelectAttr,
  } = props;

  const findSelected = (
    attrItemId: Maybe<string> | undefined,
    attrId: Maybe<string> | undefined
  ) => {
    const filteredAttrById = selectedAttributes?.filter(
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
        {attributes &&
          attributes.items?.map((attrItem) => (
            <ProductAttributesItem
              orderItemId={orderItemId}
              key={attrItem?.id}
              displValue={attrItem?.displayValue}
              attrName={attrName}
              selected={findSelected(attrItem?.id, attrId)}
              isColor={attrName === "Color"}
              value={attrItem?.value}
              onChangeAtr={() => onSelectAttr?.(attrId, attrItem?.id)}
              cartOverlay={cartOverlay}
              mainCart={mainCart}
            />
          ))}
      </div>
    </>
  );
};

export default ProductAttributes;
