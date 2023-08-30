import classes from "./DropdownItem.module.css";

const DropdownItem = (props) => {
  const { symbol, label, onSelect } = props;
  return (
    <li>
      <div className={classes.item} onClick={onSelect}>
        {symbol} {label}
      </div>
    </li>
  );
};

export default DropdownItem;
