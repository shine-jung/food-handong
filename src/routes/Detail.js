import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Like from "../components/Like";
import KakaoShare from "../components/KakaoShare";
import Review from "../components/Review";
import Map from "../components/Map";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Button,
  ButtonBase,
  Tooltip,
  Popover,
  Link,
} from "@mui/material";
import {
  faStar,
  faHeart,
  faComment,
  faPhone,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Detail.module.css";

function Detail({ auth }) {
  const { id } = useParams();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date().getDay();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const restaurantRef = ref(database, `restaurants/${id}`);
  const [centerLocation, setCenterLocation] = useState(false); // 0: 식당 위치, 1: 식당 & 내 위치
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
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
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);
  const centerBtnClick = () => {
    setCenterLocation((prev) => !prev);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Header isLogin={isLogin} onLogout={onLogout} />
      {loading ? (
        <Box className={styles.loader}>Loading...</Box>
      ) : (
        <Box className={styles.root}>
          <Box className={styles.container}>
            <Grid
              container
              spacing={{ xs: 0, md: "2%" }}
              columns={{ xs: 6, md: 12 }}
            >
              <Grid item xs={6}>
                <Paper className={styles.section}>
                  <Box className={styles.infoHeader}>
                    <Typography variant="h6">
                      {restaurant.officialName}
                    </Typography>
                    <Box>
                      <Like restaurant={restaurant} />
                      <KakaoShare restaurant={restaurant} />
                    </Box>
                  </Box>
                  <Box className={styles.info}>
                    <img
                      className={styles.infoImg}
                      src={restaurant.imgSrc}
                      alt={restaurant.officialName}
                    />
                    <Box>
                      <Typography className={styles.statusContainer}>
                        <Box className={styles.status}>
                          <FontAwesomeIcon
                            className={styles.starIcon}
                            icon={faStar}
                          />
                          {(restaurant.starCount
                            ? restaurant.starSum / restaurant.starCount
                            : 0
                          ).toFixed(1)}
                        </Box>
                        <Box className={styles.status}>
                          <FontAwesomeIcon
                            className={styles.heartIcon}
                            icon={faHeart}
                          />
                          {restaurant.likes}
                        </Box>
                        <Box>
                          <FontAwesomeIcon
                            className={styles.commentIcon}
                            icon={faComment}
                          />
                          {restaurant.reviewCount}
                        </Box>
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
                      <Typography className={styles.infoText}>
                        <Link
                          href={`tel:${restaurant.contact}`}
                          underline="none"
                        >
                          <FontAwesomeIcon
                            className={styles.callIcon}
                            icon={faPhone}
                          />
                          {restaurant.contact}
                        </Link>
                      </Typography>
                      <Box className={styles.hours}>
                        {restaurant.openingHours === "정보가 없어요" ? (
                          <Typography>영업시간 정보가 없어요 😭</Typography>
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
                          <>
                            <Tooltip title="전체 요일 보기" arrow>
                              <ButtonBase onClick={handleClick}>
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
                                <Typography
                                  className={styles.caretDownIcon}
                                  color="primary"
                                >
                                  <FontAwesomeIcon icon={faCaretDown} />
                                </Typography>
                              </ButtonBase>
                            </Tooltip>
                            <Popover
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <Typography className={styles.popHoursContainer}>
                                {days
                                  .filter((day) => restaurant.openingHours[day])
                                  .map((day, index) => (
                                    <Box
                                      key={index}
                                      className={styles.popHours}
                                    >
                                      <Typography className={styles.day}>
                                        {day}요일 :
                                      </Typography>
                                      <Box>
                                        {restaurant.openingHours[day]
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
                                    </Box>
                                  ))}
                              </Typography>
                            </Popover>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
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
                    scrollButtons="auto"
                    aria-label="menus"
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
                  <Box className={styles.mapHeader}>
                    <Typography variant="h6">지도</Typography>
                    <Tooltip
                      title={
                        centerLocation
                          ? "식당 위치 보기"
                          : "식당 & 내 위치 보기"
                      }
                      placement="top"
                      arrow
                    >
                      <Button
                        onClick={centerBtnClick}
                        className={styles.centerBtn}
                        variant="contained"
                        color="secondary"
                      >
                        {centerLocation ? "식당 & 내 위치" : "식당 위치"}
                      </Button>
                    </Tooltip>
                  </Box>
                  <Map
                    name={restaurant.name}
                    lat={restaurant.lat}
                    lon={restaurant.lon}
                    centerLocation={centerLocation}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Review restaurant={restaurant} />
              </Grid>
            </Grid>
            <Typography className={styles.updateDate}>
              정보 업데이트 날짜: {restaurant.updateDate}
            </Typography>
          </Box>
          <Footer />
        </Box>
      )}
    </>
  );
}

export default Detail;
