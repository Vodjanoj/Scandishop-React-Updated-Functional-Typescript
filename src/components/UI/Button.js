import  { Component } from "react";
import classes from "./Button.module.css";

class Button extends Component {
  render() {
    const {
      type,
      viewBag,
      checkOut,
      order,
      disabled,
      clicked,
      children,
    } = this.props;
    return (
      <button
        type={type || "button"}
        className={`${classes[`btn`]} ${viewBag ? classes[`view-bag`] : ""} ${
          checkOut ? classes[`check-out`] : ""
        } ${order ? classes[`order`] : ""}`}
        disabled={disabled}
        onClick={clicked}
      >
        {children}
      </button>
    );
  }
}

export default Button;
