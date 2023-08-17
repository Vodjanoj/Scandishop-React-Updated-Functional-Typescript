import   { Component, createRef} from "react";
import { connect } from "react-redux";
import { getCurrencies } from "../../graphql/queries";
import classes from "./Dropdown.module.css";
import { initCurrency } from "../../store/currency-actions";
import { currencyActions } from "../../store/currency-slice";
import DropdownItem from "./DropdownItem";

class Dropdown extends Component {
  dropdownRef = createRef();
  state = {
    toggleDropdown: false,
    allCurrencies: [],
  };

  componentDidMount() {
    document.addEventListener("click", this.clickOutsideHandler);
    const loadAllCurrenciesHandler = async () => {
      try {
        const data = await getCurrencies();

        this.setState({ allCurrencies: data });
      } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
      }
    };
    loadAllCurrenciesHandler();

    this.props.onInitCurrency(); // fires Redux Thunk initCurrency
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickOutsideHandler);
  }

  toggleDropdownHandler = () => {
    this.setState((prevState) => {
      return { toggleDropdown: !prevState.toggleDropdown };
    });
  };

  clickOutsideHandler = (event) => {
    const current = this.dropdownRef.current;

    if (!current.contains(event.target)) {
      this.setState({ toggleDropdown: false });
    }
  };

  render() {
    const { setCurrSymbol, onCurrencySwitch } = this.props;
    const { allCurrencies, toggleDropdown } = this.state;
    return (
      <div
        ref={this.dropdownRef}
        onClick={this.toggleDropdownHandler}
        className={`${classes.currency} ${
          toggleDropdown ? classes.active : ""
        }`}
      >
        {setCurrSymbol}
        {toggleDropdown && (
          <ul>
            {allCurrencies.map((item, index) => (
              <DropdownItem
                key={index + item.symbol}
                symbol={item.symbol}
                label={item.label}
                onSelect={() => onCurrencySwitch(item.symbol)}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setCurrSymbol: state.currency.setCurrSymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitCurrency: () => dispatch(initCurrency()),
    onCurrencySwitch: (symbol) =>
      dispatch(currencyActions.currencySwitch(symbol)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
