import classes from "./Gallery.module.css";

const Gallery = (props) => {
  const { images, name, brand, selectedImage, onSelectImage } = props;
  return (
    <>
      <div className={classes.gallery}>
        {images &&
          images.map((image, index) => (
            <div
              key={index + brand}
              className={classes.item}
              onClick={onSelectImage.bind(this, image)}
            >
              <img src={image} alt={brand + ", " + name + " thumbnail"}></img>
              <div className={classes["overlay-gray"]}></div>
            </div>
          ))}
      </div>
      <div className={classes["main-image"]}>
        {images && <img src={selectedImage} alt={brand + ", " + name}></img>}
      </div>
    </>
  );
};

export default Gallery;
