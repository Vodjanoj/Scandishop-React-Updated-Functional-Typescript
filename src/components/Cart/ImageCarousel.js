import { useState } from "react";
import classes from "./ImageCarousel.module.css";

const ImageCarousel = (props) => {
  const [mainImage, setMainImage] = useState(props.images[0]);

  const { brand, name, images } = props;

  const slideBackHandler = () => {
    const currentImageIndex = images.findIndex((image) => image === mainImage);

    let updatedIndex;

    if (currentImageIndex === 0) {
      updatedIndex = images.length - 1;
    } else {
      updatedIndex = currentImageIndex - 1;
    }
    setMainImage(images[updatedIndex]);
  };

  const slideForwardHandler = () => {
    const currentImageIndex = props.images.findIndex(
      (image) => image === mainImage
    );

    let updatedIndex;

    if (currentImageIndex === images.length - 1) {
      updatedIndex = 0;
    } else {
      updatedIndex = currentImageIndex + 1;
    }

    setMainImage(images[updatedIndex]);
  };

  return (
    <div className={classes.carousel}>
      <div className={classes["overlay-gray"]}></div>
      <img src={mainImage} alt={brand + ", " + name}></img>
      {images.length > 1 && (
        <div onClick={slideBackHandler} className={classes.back}></div>
      )}
      {images.length > 1 && (
        <div onClick={slideForwardHandler} className={classes.forward}></div>
      )}
    </div>
  );
};

export default ImageCarousel;
