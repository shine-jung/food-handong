import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Restaurant from "./Restaurant";
import styles from "./List.module.css";

function List({ searchText, sortBy, restaurants }) {
  const filteredList = restaurants.filter((restaurant) => {
    if (searchText === "") {
      return restaurant;
    } else {
      for (let i = 0; i < restaurant.menus.length; i++)
        if (restaurant.menus[i].title.toLowerCase().includes(searchText))
          return true;
      for (let i = 0; restaurant.tags && i < restaurant.tags.length; i++)
        if (restaurant.tags[i].toLowerCase().includes(searchText)) return true;
      return (
        restaurant.name.toLowerCase().includes(searchText) ||
        restaurant.dong.toLowerCase().includes(searchText) ||
        restaurant.category.toLowerCase().includes(searchText)
      );
    }
  });
  const getStarAvg = (obj) => (obj.starCount ? obj.starSum / obj.starCount : 0);
  const sortedList = filteredList.sort((a, b) => {
    if (sortBy === "likes") return b.likes - a.likes;
    else if (sortBy === "reviewCount") return b.reviewCount - a.reviewCount;
    else if (sortBy === "name")
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    else return getStarAvg(b) - getStarAvg(a);
  });
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 3.5 }}
        columns={{ xs: 1, md: 2, lg: 3, xl: 4 }}
      >
        {sortedList.map((restaurant) => (
          <Grid key={restaurant.id} item xs={1} md={1} lg={1} xl={1}>
            <Link
              className={styles.restaurant}
              to={`/restaurant/${restaurant.id}`}
            >
              <Restaurant restaurant={restaurant} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

List.propTypes = {
  searchText: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  restaurants: PropTypes.array.isRequired,
};

export default List;
