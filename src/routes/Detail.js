import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import Header from "../components/Header";
import Map from "../components/Map";
import { Box, Grid, Paper, Typography, Tabs, tabsClasses } from "@mui/material";
import styles from "./Detail.module.css";

function Detail({ auth }) {
  const { id } = useParams();
  const days = ["매일", "일", "월", "화", "수", "목", "금", "토"];
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const restaurantRef = ref(database, `restaurants/${id}`);

  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);
  useEffect(() => {
    auth.onAuthChange((user) => {
      user ? setIsLogin(true) : setIsLogin(false);
    });
    onValue(restaurantRef, (snapshot) => {
      const data = snapshot.val();
      setRestaurant(data);
      setLoading(false);
    });
  }, [auth, restaurantRef]);
  return (
    <>
      <Header isLogin={isLogin} onLogout={onLogout} />
      {loading ? (
        <Box className={styles.loader}>Loading...</Box>
      ) : (
        <Box className={styles.container}>
          <Box className={styles.detail}>
            <Grid
              container
              spacing={{ xs: 3, md: "2%" }}
              columns={{ xs: 6, md: 12 }}
            >
              <Grid item xs={6}>
                <Box className="info">
                  <img
                    className={styles.img}
                    src={restaurant.imgSrc}
                    alt={restaurant.officialName}
                  />
                  <p>{restaurant.officialName}</p>
                  <p>{restaurant.category}</p>
                  <p>{restaurant.dong}</p>
                  <p>{restaurant.location}</p>
                  <Box>
                    {days
                      .filter((day) => restaurant.openingHours[day])
                      .map((day, index) => (
                        <Box key={index}>
                          {day} :
                          <Box>
                            {restaurant.openingHours[day]
                              .split("\n")
                              .map((line, index) => (
                                <Box key={index}>
                                  {line}
                                  <br />
                                </Box>
                              ))}
                          </Box>
                        </Box>
                      ))}
                  </Box>
                  <Paper className={styles.section}>
                    <Typography className={styles.title} variant="h6">
                      메뉴
                    </Typography>
                    <Box className={styles.menus}>
                      <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        scrollButtons
                        aria-label="menus"
                        sx={{
                          [`& .${tabsClasses.scrollButtons}`]: {
                            "&.Mui-disabled": { opacity: 0.3 },
                          },
                        }}
                      >
                        {restaurant.menus.map((menu, index) => (
                          <Box key={index} className={styles.menu}>
                            {menu.imgSrc && (
                              <img
                                className={styles.img}
                                src={menu.imgSrc}
                                alt={menu.title}
                              />
                            )}
                            <Box className={styles.menuText}>
                              <Typography>{menu.title}</Typography>
                              <Typography>{menu.price}</Typography>
                            </Box>
                          </Box>
                        ))}
                      </Tabs>
                    </Box>
                  </Paper>
                  <Paper className={styles.section}>
                    <Typography className={styles.title} variant="h6">
                      지도
                    </Typography>
                    <Map lat={restaurant.lat} lon={restaurant.lon} />
                  </Paper>
                  <Typography>
                    업데이트 날짜: {restaurant.updateDate}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Paper className={styles.section}>Review</Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Detail;
