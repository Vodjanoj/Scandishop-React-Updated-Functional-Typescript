import classes from "./ProductItem.module.css";
import circleCartIcon from "../../assets/circle-icon.png";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Price } from "../../gql/graphql";

interface ProductItemProps extends RouteComponentProps<{ categoryName: string }> {
  id: string;
  brand: string;
  name: string;  
  inStock: boolean | null | undefined;  
  currPrice: Price[];  
  image: string | null | undefined;
  onAddToCart: (event: React.MouseEvent) => void;  
}

const ProductItem = (props: ProductItemProps) => {
  const { categoryName } = props.match.params;
  const { symbol } = props.currPrice[0].currency;
  const { amount } = props.currPrice[0];
  const { id, brand, name, image, inStock, onAddToCart } = props;

  return (
    <>
      <article className={classes.product}>
        <Link to={`/categories/${categoryName}/${id}`}>
          <div className={classes.inner}>
            {!inStock && (
              <div className={classes[`out-of-stock`]}>
                <div className={classes["out-of-stock-caption"]}>
                  Out of Stock
                </div>
              </div>
            )}
            <div className={classes.image}>
              <div className={classes.overlay}></div>
              {image && <img src={image} alt={brand + ", " + name}></img>}
            </div>
            <div className={classes.name}>
              {brand} {name}
            </div>
            {inStock && (
              <div
                className={classes[`circle-cart-icon`]}
                onClick={onAddToCart}
              >
                <img src={circleCartIcon} alt="A quick add to cart!"></img>
              </div>
            )}
            <div className={classes.price}>
              {symbol}
              {amount}
            </div>
          </div>
        </Link>
      </article>
    </>
  );
};

export default withRouter(ProductItem);
