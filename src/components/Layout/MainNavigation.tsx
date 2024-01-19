import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import classes from "./MainNavigation.module.css";
import { getCategories } from "../../graphql/queries";
import mainLogo from "../../assets/a-logo.png";
import Dropdown from "./Dropdown";
import CartGroup from "../Cart/CartGroup";
import { RootState } from "../../store";

type CategoryType = {
  __typename?: "Category" | undefined;
  name?: string | null | undefined;
};

const MainNavigation = () => {
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState(false);

  let totalQuantity = useAppSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  useEffect(() => {
    const loadAllCategoriesHandler = async () => {
      try {
        const data = await getCategories();

        const filteredData = (data || []).filter(
          (cat) => cat !== null) as CategoryType[];
        setAllCategories(filteredData);
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
          {allCategories.map((cat) => (
            <NavLink
              key={cat.name}
              activeClassName={classes.active}
              to={"/categories/" + cat.name}
              title={cat.name ? cat.name : undefined}
            >
              {cat.name}
            </NavLink>
          ))}
        </nav>
        <div className={classes.logo}>
          <Link to={"/"}>
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
