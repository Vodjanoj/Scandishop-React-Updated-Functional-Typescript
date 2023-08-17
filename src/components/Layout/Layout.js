import { Component } from "react";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

class Layout extends Component {
  render() {
    return (
      <>
        <MainNavigation/>
        <main className={classes.main}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
