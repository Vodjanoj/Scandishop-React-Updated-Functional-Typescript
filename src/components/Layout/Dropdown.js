import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrencies } from "../../graphql/queries";
import classes from "./Dropdown.module.css";
import { initCurrency } from "../../store/currency-actions";
import { currencyActions } from "../../store/currency-slice";
import DropdownItem from "./DropdownItem";

const Dropdown = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState([]);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const setCurrSymbol = useSelector((state) => state.currency.setCurrSymbol);

  useEffect(() => {
    document.addEventListener("click", clickOutsideHandler);
    const loadAllCurrenciesHandler = async () => {
      try {
        const data = await getCurrencies();

        setAllCurrencies(data);
      } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
      }
    };
    loadAllCurrenciesHandler();

    dispatch(initCurrency());

    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, [dispatch]);

  const toggleDropdownHandler = () => {
    setToggleDropdown((prevState) => !prevState);
  };

  const clickOutsideHandler = (event) => {
    const current = dropdownRef.current;

    if (!current.contains(event.target)) {
      setToggleDropdown(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      onClick={toggleDropdownHandler}
      className={`${classes.currency} ${toggleDropdown ? classes.active : ""}`}
    >
      {setCurrSymbol}
      {toggleDropdown && (
        <ul>
          {allCurrencies.map((item, index) => (
            <DropdownItem
              key={index + item.symbol}
              symbol={item.symbol}
              label={item.label}
              onSelect={() =>
                dispatch(currencyActions.currencySwitch(item.symbol))
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
