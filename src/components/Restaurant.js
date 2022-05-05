import PropTypes from "prop-types";
import { Box, Grid, Paper, Typography } from "@mui/material";
import styles from "./Restaurant.module.css";

function Restaurant({ restaurant }) {
  return (
    <Box className={styles.container}>
      <Paper className={styles.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <img
              className={styles.img}
              src={restaurant.imgSrc}
              alt={restaurant.officialName}
            />
          </Grid>
          <Grid item xs={4} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {restaurant.dong}
                </Typography>
                <Typography
                  className={styles.menu}
                  variant="body2"
                  color="text.secondary"
                >
                  {restaurant.menus[0] && (
                    <Box>{restaurant.menus[0].title}</Box>
                  )}
                  {restaurant.menus[1] && (
                    <Box>{restaurant.menus[1].title}</Box>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{restaurant.category}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                평점: {0}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default Restaurant;
