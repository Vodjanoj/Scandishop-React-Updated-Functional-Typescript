import React, { Component } from "react";
import classes from "./DropdownItem.module.css";

class DropdownItem extends Component {
  render() {
    const { symbol, label, onSelect } = this.props;
    return (
      <li>
        <div className={classes.item} onClick={onSelect}>
          {symbol} {label}
        </div>
      </li>
    );
  }
}

export default DropdownItem;
