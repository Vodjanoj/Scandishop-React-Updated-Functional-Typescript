import classes from "./DropdownItem.module.css";

type DropdownItemProps = {
  symbol: string;
  label: string;
  onSelectCurrency: () => void;
};

const DropdownItem = (props: DropdownItemProps) => {
  const { symbol, label, onSelectCurrency } = props;
  return (
    <li>
      <div className={classes.item} onClick={onSelectCurrency}>
        {symbol} {label}
      </div>
    </li>
  );
};

export default DropdownItem;
