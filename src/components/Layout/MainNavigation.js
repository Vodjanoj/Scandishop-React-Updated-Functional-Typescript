import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./MainNavigation.module.css";
import { getCategories } from "../../graphql/queries";
import mainLogo from "../../assets/a-logo.png";
import Dropdown from "./Dropdown";
import CartGroup from "../Cart/CartGroup";

const MainNavigation = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState(false);

  let totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    const loadAllCategoriesHandler = async () => {
      try {
        const data = await getCategories();

        setAllCategories(data);
      } catch (error) {
        setError(true);
      }
    };
    loadAllCategoriesHandler();
  }, []);

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
};

export default MainNavigation;
