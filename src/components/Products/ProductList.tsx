import { useState } from "react";
 
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";
import { filterPrices } from "../Utils/filterPrices";
import { cartActions } from "../../store/cart-slice";
import { getProductsAttributesById } from "../../graphql/queries";
import { RootState } from "../../store";
import { Product, AttributeSet } from "../../gql/graphql";
import { selectedAttribute } from "../../store/cart-slice";

interface ProductListProps {
  productItems: Product[];
}

const ProductList = (props: ProductListProps) => {
  const [error, setError] = useState(false);
  const { productItems } = props;
  let { setCurrSymbol } = useAppSelector((state: RootState) => state.currency);
  const dispatch = useAppDispatch();

  const addToCartHandler = (event: React.MouseEvent, prodItem: Product) => {
    event.preventDefault();

    const loadProductDetailsHandler = async () => {
      try {
        const attributes: AttributeSet[] = await getProductsAttributesById(prodItem.id);

        const selectedAttributes: selectedAttribute[] = attributes.map(
          (attribute) => {
            const firstItem = attribute.items?.[0];

            return {
              id: attribute.id,
              name: attribute.name,
              selectedAttrItemId: firstItem ? firstItem.id : null,
            };
          }
        );

        const idForCart = selectedAttributes.reduce(
          (collectAttr, currentAtrItem) =>
            collectAttr + "_" + currentAtrItem.selectedAttrItemId,
          ""
        );

        dispatch(
          cartActions.addToCart({
            id: prodItem.id + idForCart,
            brand: prodItem.brand,
            name: prodItem.name,
            gallery: prodItem.gallery,
            attributes: attributes,
            prices: prodItem.prices,
            selectedAttributes: selectedAttributes,
            quantity: 1,
            category: "",
            description: "",
          })
        );
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    loadProductDetailsHandler();
  };

  if (error) {
    return <p>Sorry, something went wrong!</p>;
  }
  return (
    <div className={classes.products}>
      {productItems.map((item, index) => (
        <ProductItem
          key={index + item.id}
          id={item.id}
          onAddToCart={(event: React.MouseEvent) => addToCartHandler(event, item)}
          brand={item.brand}
          name={item.name}
          inStock={item.inStock}
          currPrice={filterPrices(item.prices, setCurrSymbol)}
          image={item?.gallery?.[0]}
        />
      ))}
    </div>
  );
};

export default ProductList;
