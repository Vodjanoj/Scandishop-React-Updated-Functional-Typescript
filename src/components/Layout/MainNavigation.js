import { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./MainNavigation.module.css";
import { getCategories } from "../../graphql/queries";
import mainLogo from "../../assets/a-logo.png";
import Dropdown from "./Dropdown";
import CartGroup from "../Cart/CartGroup";
import { withRouter } from "react-router-dom";

class MainNavigation extends Component {
  state = {
    allCategories: [],
    error: false,
  };

  componentDidMount() {
    const loadAllCategoriesHandler = async () => {
      try {
        const data = await getCategories();

        this.setState({
          allCategories: data,
        });
      } catch (error) {
        this.setState({ error: true });
      }
    };
    loadAllCategoriesHandler();
  }

  render() {
    const { allCategories, error } = this.state;
    const { totalQuantity } = this.props;
    if (error) {
      return <p>Sorry, something went wrong!</p>;
    }
    return (
      <header className={classes.header}>
        <div className={classes.inner}>
          <nav className={classes.nav}>
            {allCategories.map((cat, index) => (
              <NavLink
                key={index + cat.name}
                activeClassName={classes.active}
                to={"/categories/" + cat.name}
                title={cat.name}
              >
                {cat.name}
              </NavLink>
            ))}
          </nav>
          <div className={classes.logo}>
            <Link to={"/"} exact="true">
              <img src={mainLogo} alt="Shopping!"></img>
            </Link>
          </div>
          <div className={classes.toolbar}>
            <Dropdown />
            <CartGroup totalQuantity={totalQuantity} />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalQuantity: state.cart.totalQuantity,
  };
};

export default connect(mapStateToProps, null)(withRouter(MainNavigation));
