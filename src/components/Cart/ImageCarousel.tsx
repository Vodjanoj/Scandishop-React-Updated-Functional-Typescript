import { useState } from "react";
import classes from "./ImageCarousel.module.css";
import { Maybe } from "../../gql/graphql";

interface ImageCarouselProps {
  brand: string;
  name: string;
  images?: Maybe<string>[] | undefined | null;
}

const ImageCarousel = (props: ImageCarouselProps) => {
  const [mainImage, setMainImage] = useState(props?.images?.[0]);

  const { brand, name, images } = props;

  const slideBackHandler = () => {
    const currentImageIndex = images?.findIndex((image) => image === mainImage);

    let updatedIndex: number;

    if (images && currentImageIndex === 0) {
      updatedIndex = images.length - 1;
    } else {
      updatedIndex = currentImageIndex ? currentImageIndex - 1 : 0;
    }

    setMainImage(images?.[updatedIndex]);
  };

  const slideForwardHandler = () => {
    const currentImageIndex = props.images?.findIndex(
      (image) => image === mainImage
    );
    let updatedIndex: number = 0;
    
    if (images && currentImageIndex === images.length - 1) {
      updatedIndex = 0;
    } else {
      updatedIndex = currentImageIndex || currentImageIndex === 0  ? currentImageIndex + 1 : 0;
    }
    
    if (images) { 
    setMainImage(images[updatedIndex]);
    };
  }
  return (
    <div className={classes.carousel}>
      <div className={classes["overlay-gray"]}></div>

      <img // @ts-ignore
        src={mainImage}
        alt={brand + ", " + name}
      ></img>

      {
        // @ts-ignore
        images.length > 1 && (
          <div onClick={slideBackHandler} className={classes.back}></div>
        )
      }
      {
        // @ts-ignore
        images.length > 1 && (
          <div onClick={slideForwardHandler} className={classes.forward}></div>
        )
      }
    </div>
  );
};

export default ImageCarousel;
