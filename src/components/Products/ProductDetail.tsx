import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import ProductAttributes from "./ProductAttributes";
import { useSelector, useDispatch } from "react-redux";
import { filterPrices } from "../Utils/filterPrices";
import { getProductsById } from "../../graphql/queries";
import { getProductsAttributesById } from "../../graphql/queries";
import classes from "./ProductDetail.module.css";
import { withRouter, useParams, RouteComponentProps } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import Gallery from "./Gallery";
import Button from "../UI/Button";
import { Product } from "../../gql/graphql";

interface ProductDetailProps extends RouteComponentProps {
  
}

const ProductDetail = ({match}: ProductDetailProps) => {
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const loadProductDetailsHandler = async () => {
      try {
        const product = await getProductsById(productId);

        // A seperate query with fetchPolicy: "network-only" for getting attributes
        // of a product from a server, not from cache, by not getting the whole data of a product
        // from a server with each rendering of a component we save the network traffic.
        // If we get attributes from cache they are being mixed with attribites of other products,
        // so we have an issue with correct displaying of attributes associated to a specific product
        const attributes = await getProductsAttributesById(productId);
         // @ts-ignore c
        const selectedAttributes = attributes.map((attribute) => ({
          id: attribute.id,
          name: attribute.name,
          selectedAttrItemId: attribute.items[0].id,
        }));

        setProductDetails({ ...product, attributes });
        setSelectedImage(product.gallery[0]);
        setSelectedAttributes(selectedAttributes);
      } catch (error) {
        setError(true);
      }
    };
    loadProductDetailsHandler();
  }, [productId]);
// @ts-ignore c
  const selectAttrHandler = (attId, attItemId) => {
     
    const updatedSelcAttr = selectedAttributes.map((attribute) =>
     // @ts-ignore 
      attribute.id === attId
       // @ts-ignore 
        ? { ...attribute, selectedAttrItemId: attItemId }
        : attribute
    );
   // @ts-ignore 
    setSelectedAttributes(updatedSelcAttr);
  };
 // @ts-ignore 
  const selectImageHandler = (image) => {
    setSelectedImage(image);
  };

  const addToCartHandler = () => {
     // @ts-ignore 
    const { id, brand, name, gallery, attributes, prices } = productDetails;

    const idForCart = selectedAttributes.reduce(
      (collectAttr, currentAtrItem) =>
       // @ts-ignore 
        collectAttr + "_" + currentAtrItem.selectedAttrItemId,
      ""
    );

    dispatch(
      cartActions.addToCart({
        id: id + idForCart,
        brand: brand,
        name: name,
        gallery: gallery,
        attributes: attributes,
        prices: prices,
        selectedAttributes: selectedAttributes,
        quantity: 1,
        category: "",
        description: "",
      })
    );
  };
 // @ts-ignore 
  const { brand, name, gallery, attributes, prices, inStock, description } =
    productDetails;
 // @ts-ignore 
  const setCurrSymbol = useSelector((state) => state.currency.setCurrSymbol);

  const sanitizedDescription = DOMPurify.sanitize(description);

  let price;
  if (prices && setCurrSymbol !== "") {
    const amount = filterPrices(prices, setCurrSymbol);
    price = amount[0].amount;
  }

  if (error) {
    return <p>Sorry, something went wrong</p>;
  }
  console.log("attributes");
  return (
    <>
      <div className={classes.card}>
        <Gallery
          onSelectImage={selectImageHandler}
          selectedImage={selectedImage}
          images={gallery}
          name={name}
          brand={brand}
        />
        <div className={classes.details}>
          <h1 className={classes.brand}>{brand}</h1>
          <h2 className={classes.name}>{name}</h2>
          {attributes && (
            
            <div className={classes.attributes}>
              
              {attributes.map( // @ts-ignore 
              (attribute, index) => (
                <ProductAttributes
                  key={index + attribute.id}
                  attrName={attribute.name}
                  attrId={attribute.id}
                  attributes={attribute}
                  selectedAttributes={selectedAttributes}
                  onSelectAttr={selectAttrHandler}
                />
              ))}
            </div>
          )}
          <div className={classes.price}>Price:</div>
          <div className={classes["current-price"]}>
            {setCurrSymbol}
            {price}
          </div>
          <Button disabled={!inStock} clicked={addToCartHandler}>
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <div
            className={classes.description}
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(ProductDetail);
