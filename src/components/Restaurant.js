import PropTypes from "prop-types";
import { Box, Paper, Typography } from "@mui/material";
import {
  faStar,
  faHeart,
  faComment,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Restaurant.module.css";

function Restaurant({ restaurant, recommend = false }) {
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
            <Typography
              className={styles.infoText}
              variant="subtitle1"
              component="div"
              gutterBottom
            >
              {restaurant.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {restaurant.dong}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <Box className={styles.infoText}>
                {restaurant.menus[0]?.title}
              </Box>
              <Box className={styles.infoText}>
                {restaurant.menus[1]?.title}
              </Box>
            </Typography>
          </Box>
          <Box>
            <Typography className={styles.category} variant="subtitle2">
              {restaurant.category}
            </Typography>
            {recommend && (
              <Typography variant="subtitle2" color="secondary">
                <Box className={styles.recommend}>
                  <FontAwesomeIcon
                    className={styles.recommendIcon}
                    icon={faLightbulb}
                  />
                  추천
                </Box>
              </Typography>
            )}
          </Box>
        </Box>
        <Typography className={styles.statusContainer} color="text.secondary">
          <Box className={styles.status}>
            <FontAwesomeIcon className={styles.starIcon} icon={faStar} />
            {starAvg.toFixed(1)}
          </Box>
          <Box className={styles.status}>
            <FontAwesomeIcon className={styles.heartIcon} icon={faHeart} />
            {restaurant.likes}
          </Box>
          <Box>
            <FontAwesomeIcon className={styles.commentIcon} icon={faComment} />
            {restaurant.reviewCount}
          </Box>
        </Typography>
      </Box>
    </Paper>
  );
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default Restaurant;
