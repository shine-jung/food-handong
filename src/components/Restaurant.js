import PropTypes from "prop-types";
import { Box, Paper, Typography } from "@mui/material";
import {
  faStar,
  faHeart,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Restaurant.module.css";

function Restaurant({ restaurant }) {
  const starAvg = restaurant.starCount
    ? restaurant.starSum / restaurant.starCount
    : 0;
  return (
    <Paper className={styles.paper}>
      <Box className={styles.imgContainer}>
        <img
          className={styles.img}
          src={restaurant.imgSrc}
          alt={restaurant.officialName}
        />
      </Box>
      <Box className={styles.infoContainer}>
        <Box className={styles.textContainer}>
          <Box className={styles.info}>
            <Typography variant="subtitle1" component="div" gutterBottom>
              {restaurant.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {restaurant.dong}
            </Typography>
            <Typography
              className={styles.menu}
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {restaurant.menus[0] && (
                <Box className={styles.menu}>{restaurant.menus[0].title}</Box>
              )}
              {restaurant.menus[1] && (
                <Box className={styles.menu}>{restaurant.menus[1].title}</Box>
              )}
            </Typography>
          </Box>
          <Typography variant="subtitle2" component="div" gutterBottom>
            {restaurant.category}
          </Typography>
        </Box>
        <Typography className={styles.statusContainer} variant="body2">
          <FontAwesomeIcon className={styles.barIcon} icon={faStar} />
          {starAvg.toFixed(1)}
          <FontAwesomeIcon className={styles.barIcon} icon={faHeart} />
          {restaurant.likes}
          <FontAwesomeIcon className={styles.barIcon} icon={faMessage} />
          {restaurant.reviewCount}
        </Typography>
      </Box>
    </Paper>
  );
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default Restaurant;
