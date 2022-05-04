import PropTypes from "prop-types";
import { Box, Grid, Paper, Typography, ButtonBase } from "@mui/material";
import styles from "./Restaurants.module.css";

function Restaurants({ restaurant }) {
  return (
    <Box className={styles.container}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          borderRadius: "0.5rem",
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1)",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 150, height: 160 }}>
              <img
                className={styles.img}
                src={restaurant.imgSrc}
                alt={restaurant.officialName}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
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
                    <div>{restaurant.menus[0].title}</div>
                  )}
                  {restaurant.menus[1] && (
                    <div>{restaurant.menus[1].title}</div>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  {restaurant.category}
                </Typography>
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

Restaurants.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default Restaurants;
