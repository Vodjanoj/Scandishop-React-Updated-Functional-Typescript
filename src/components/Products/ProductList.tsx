import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";
import { filterPrices } from "../Utils/filterPrices";
import { cartActions } from "../../store/cart-slice";
import { getProductsAttributesById } from "../../graphql/queries";
import { RootState } from "../../store";
import { Product, AttributeSet } from "../../gql/graphql";

type ProductListProps = {
  productItems: Product[];
}

const ProductList = (props: ProductListProps) => {
  const [error, setError] = useState(false);
  const { productItems } = props;
  let { setCurrSymbol } = useAppSelector((state: RootState) => state.currency);
  const dispatch = useDispatch();

  const addToCartHandler = (event: MouseEvent, prodItem: Product) => {
    event.preventDefault();

    const loadProductDetailsHandler = async () => {
      try {
        const attributes = await getProductsAttributesById(prodItem.id);

        const selectedAttributes = attributes.map((attribute: AttributeSet) => {
          const firstItem = attribute.items?.[0];
          console.log('attributes', attributes)
          console.log('firstItem ', firstItem )
          return {
            id: attribute.id,
            name: attribute.name,
            selectedAttrItemId: firstItem ? firstItem.id : null,
          };
        });

        const idForCart = selectedAttributes.reduce(
          // @ts-ignore
          (collectAttr, currentAtrItem) =>
            collectAttr + "_" + currentAtrItem.selectedAttrItemId,
          ""
        );
         
        dispatch(
          cartActions.addToCart({
            // @ts-ignore
            id: prodItem.id + idForCart,
            brand: prodItem.brand,
            name: prodItem.name,
            gallery: prodItem.gallery,
            attributes: attributes,
            prices: prodItem.prices,
            selectedAttributes: selectedAttributes,
            quantity: 1,
            category: "",
            description: ""
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
    <>
      <div className={classes.products}>
        {productItems.map((item, index) => (
          <ProductItem
            key={index + item.id}
            id={item.id}
            onAddToCart={(event: MouseEvent ) => addToCartHandler(event, item)}
            brand={item.brand}
            name={item.name}
            inStock={item.inStock}
            prices={item.prices}
            currPrice={filterPrices(item.prices, setCurrSymbol)}
            image={item?.gallery?.[0]}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
