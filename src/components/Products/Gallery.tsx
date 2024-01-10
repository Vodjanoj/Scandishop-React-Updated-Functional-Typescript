import { Maybe } from "../../gql/graphql";
import classes from "./Gallery.module.css";

interface GalleryProps {
  images?: Maybe<Maybe<string>[]> | undefined;
  name: string;
  brand: string;
  selectedImage: string | null;
  onSelectImage: (image: Maybe<string>) => void;
}

const Gallery = (props: GalleryProps) => {
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
              {image && (
                <img src={image} alt={brand + ", " + name + " thumbnail"}></img>
              )}
              <div className={classes["overlay-gray"]}></div>
            </div>
          ))}
      </div>
      <div className={classes["main-image"]}>
        {images && selectedImage && (
          <img src={selectedImage} alt={brand + ", " + name}></img>
        )}
      </div>
    </>
  );
};

export default Gallery;
