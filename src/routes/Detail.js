import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import Header from "../components/Header";
import Map from "../components/Map";
import { Box, Grid } from "@mui/material";
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
  }, []);
  return (
    <>
      <Header isLogin={isLogin} onLogout={onLogout} />
      {loading ? (
        <Box className={styles.loader}>Loading...</Box>
      ) : (
        <Box className={styles.container}>
          <Box className={styles.infos}>
            <img
              className={styles.img}
              src={restaurant.imgSrc}
              alt={restaurant.officialName}
            />
            <div>
              <a
                href={restaurant.naverUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {restaurant.officialName}
              </a>
            </div>
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
            <Box>
              {restaurant.menus.map((menu, index) => (
                <li key={index}>
                  {menu.title} {menu.price}
                  {menu.imgSrc && (
                    <img
                      src={menu.imgSrc}
                      alt={menu.title}
                      width="150px"
                      height="150px"
                    />
                  )}
                </li>
              ))}
            </Box>
            <p>{restaurant.updateDate}</p>
            <Map lat={restaurant.lat} lon={restaurant.lon} />
          </Box>
        </Box>
      )}
    </>
  );
}

export default Detail;
