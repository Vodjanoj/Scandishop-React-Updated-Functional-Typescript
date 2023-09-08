import classes from "./DropdownItem.module.css";

type DropdownItemProps = {
  symbol: string;
  label: string;
  onSelect: any;
};

const DropdownItem = (props: DropdownItemProps) => {
  const { symbol, label, onSelect } = props;
  return (
    <li>
      <div className={classes.item} onClick={(e) => onSelect(e)}>
        {symbol} {label}
      </div>
    </li>
  );
};

export default DropdownItem;
