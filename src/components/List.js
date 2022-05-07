import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Restaurant from "./Restaurant";
import styles from "./List.module.css";

function List({ searchText, restaurants }) {
  const filteredList = restaurants.filter((restaurant) => {
    if (searchText === "") {
      return restaurant;
    } else {
      for (let i = 0; i < restaurant.menus.length; i++) {
        if (restaurant.menus[i].title.toLowerCase().includes(searchText))
          return true;
      }
      return (
        restaurant.name.toLowerCase().includes(searchText) ||
        restaurant.dong.toLowerCase().includes(searchText) ||
        restaurant.category.toLowerCase().includes(searchText)
      );
    }
  });
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3.5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {filteredList.map((restaurant, index) => (
          <Grid key={index} item xs={4} sm={4} md={4}>
            <Link
              className={styles.restaurant}
              to={`/restaurant/${restaurant.id}`}
            >
              <Restaurant key={restaurant.id} restaurant={restaurant} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

List.propTypes = {
  searchText: PropTypes.string.isRequired,
  restaurants: PropTypes.array.isRequired,
};

export default List;
