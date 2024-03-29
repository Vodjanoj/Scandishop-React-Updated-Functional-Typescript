import { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { getCurrencies } from "../../graphql/queries";
import classes from "./Dropdown.module.css";
import { initCurrency } from "../../store/currency-actions";
import { currencyActions } from "../../store/currency-slice";
import DropdownItem from "./DropdownItem";
import { RootState } from "../../store";
import { Currency } from "../../gql/graphql";

const Dropdown = () => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [allCurrencies, setAllCurrencies] = useState<Currency[]>([]);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const setCurrSymbol = useAppSelector(
    (state: RootState) => state.currency.setCurrSymbol
  );

  useEffect(() => {
    document.addEventListener("click", clickOutsideHandler);
    const loadAllCurrenciesHandler = async () => {
      try {
        const data = await getCurrencies();

        if (data && Array.isArray(data)) {
          setAllCurrencies(
            data.filter((currency) => currency !== null) as Currency[]
          );
        }
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

  const clickOutsideHandler = (event: MouseEvent) => {
    const current = dropdownRef.current;
    if (current) {
      if (!current.contains(event.target as Node)) {
        setToggleDropdown(false);
      }
    }
  };

  const selectCurrencyHandler = (currSymb: string) => {
    dispatch(currencyActions.currencySwitch(currSymb));
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
          {allCurrencies &&
            allCurrencies.map((item, index) => (
              <DropdownItem
                key={index + item.symbol}
                symbol={item.symbol}
                label={item.label}
                onSelectCurrency={() => selectCurrencyHandler(item.symbol)}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
