import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import Header from "../components/Header";
import Map from "../components/Map";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  tabsClasses,
  ButtonBase,
  Tooltip,
} from "@mui/material";
import styles from "./Detail.module.css";

function Detail({ auth }) {
  const { id } = useParams();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date().getDay();
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
  }, []);
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
              spacing={{ xs: 0, md: "2%" }}
              columns={{ xs: 6, md: 12 }}
            >
              <Grid item xs={6}>
                <Box className="info">
                  <Paper className={styles.section}>
                    <Typography className={styles.title} variant="h6">
                      {restaurant.officialName}
                    </Typography>
                    <Box className={styles.info}>
                      <img
                        className={styles.infoImg}
                        src={restaurant.imgSrc}
                        alt={restaurant.officialName}
                      />
                      <Box>
                        <Typography className={styles.infoText}>
                          평점: 0
                        </Typography>
                        <Typography className={styles.infoText}>
                          좋아요: 0
                        </Typography>
                        <Typography className={styles.infoText}>
                          리뷰 수: 0
                        </Typography>
                        <Typography className={styles.infoText}>
                          {restaurant.category}
                        </Typography>
                        <Typography className={styles.infoText}>
                          {restaurant.dong}
                        </Typography>
                        <Typography className={styles.infoText}>
                          {restaurant.location}
                        </Typography>
                        <Box className={styles.hours}>
                          {restaurant.openingHours === "정보가 없어요" ? (
                            <Typography>정보가 없어요 😭</Typography>
                          ) : restaurant.openingHours["매일"] ? (
                            <>
                              <Typography className={styles.day}>
                                매일 :
                              </Typography>
                              <Box>
                                {restaurant.openingHours["매일"]
                                  .split("\n")
                                  .map((line, index) => (
                                    <Typography key={index}>
                                      {line}
                                      <br />
                                    </Typography>
                                  ))}
                              </Box>
                            </>
                          ) : (
                            <Tooltip title="전체 요일 보기" arrow>
                              <ButtonBase>
                                <Typography className={styles.day}>
                                  {days[today]}요일 :
                                </Typography>
                                <Box>
                                  {restaurant.openingHours[days[today]]
                                    .split("\n")
                                    .map((line, index) => (
                                      <Typography
                                        key={index}
                                        sx={{ textAlign: "left" }}
                                      >
                                        {line}
                                        <br />
                                      </Typography>
                                    ))}
                                </Box>
                              </ButtonBase>
                            </Tooltip>
                          )}
                        </Box>
                      </Box>
                    </Box>
                    {/* <Box>
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
                    </Box> */}
                  </Paper>
                  <Paper className={styles.section}>
                    <Typography className={styles.title} variant="h6">
                      메뉴
                    </Typography>
                    <Tabs
                      className={styles.menus}
                      value={false}
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
                              className={styles.menuImg}
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
                  </Paper>
                  <Paper className={styles.section}>
                    <Typography className={styles.title} variant="h6">
                      지도
                    </Typography>
                    <Map lat={restaurant.lat} lon={restaurant.lon} />
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Paper className={styles.section}>Review</Paper>
              </Grid>
            </Grid>
            <Typography>정보 업데이트 날짜: {restaurant.updateDate}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Detail;
