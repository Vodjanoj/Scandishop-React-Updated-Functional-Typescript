import React, { Component } from "react";
import classes from "./ImageCarousel.module.css";

class ImageCarousel extends Component {
  state = {
    mainImage: this.props.images[0],
  };

  slideBackHandler = () => {
    const currentImageIndex = this.props.images.findIndex(
      (image) => image === this.state.mainImage
    );

    let updatedIndex;
    const { images } = this.props;

    if (currentImageIndex === 0) {
      updatedIndex = images.length - 1;
    } else {
      updatedIndex = currentImageIndex - 1;
    }

    this.setState({
      mainImage: images[updatedIndex],
    });
  };

  slideForwardHandler = () => {
    const currentImageIndex = this.props.images.findIndex(
      (image) => image === this.state.mainImage
    );

    let updatedIndex;
    const { images } = this.props;

    if (currentImageIndex === images.length - 1) {
      updatedIndex = 0;
    } else {
      updatedIndex = currentImageIndex + 1;
    }

    this.setState({
      mainImage: images[updatedIndex],
    });
  };

  render() {
    const { brand, name, images } = this.props;
    const { mainImage } = this.state;
    return (
      <div className={classes.carousel}>
        <div className={classes["overlay-gray"]}></div>
        <img src={mainImage} alt={brand + ", " + name}></img>
        {this.props.images.length > 1 && (
          <div onClick={this.slideBackHandler} className={classes.back}></div>
        )}
        {images.length > 1 && (
          <div
            onClick={this.slideForwardHandler}
            className={classes.forward}
          ></div>
        )}
      </div>
    );
  }
}

export default ImageCarousel;
