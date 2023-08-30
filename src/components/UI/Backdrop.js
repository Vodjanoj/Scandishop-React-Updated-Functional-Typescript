import { useEffect } from "react";
import classes from "./Backdrop.module.css";

const Backdrop = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return <div className={classes.backdrop}></div>;
};

export default Backdrop;
