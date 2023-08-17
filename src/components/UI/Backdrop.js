import  { Component } from "react";
import classes from "./Backdrop.module.css";

class Backdrop extends Component {
  
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  render() {
    return (
      <div className={classes.backdrop}></div>
    );
  }
}

export default Backdrop;
