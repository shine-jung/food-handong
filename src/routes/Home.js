import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import Header from "../components/Header";
import Restaurant from "../components/Restaurant";
import { Box, Grid } from "@mui/material";
import styles from "./Home.module.css";

function Home({ auth }) {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const restaurantsRef = ref(database, "restaurants");
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);
  useEffect(() => {
    auth.onAuthChange((user) => {
      user ? setIsLogin(true) : setIsLogin(false);
    });
    onValue(restaurantsRef, (snapshot) => {
      const datas = snapshot.val();
      setRestaurants(datas);
      setLoading(false);
    });
  }, [auth, restaurantsRef]);
  return (
    <>
      <Header isLogin={isLogin} onLogout={onLogout} />
      {loading ? (
        <Box className={styles.loader}>Loading...</Box>
      ) : (
        <Box className={styles.container}>
          <Box className={styles.restaurants}>
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {restaurants.map((restaurant, index) => (
                <Grid key={index} item xs={4} sm={4} md={4}>
                  <Link
                    className={styles.restaurant}
                    to={`/restaurant/${index}`}
                  >
                    <Restaurant key={restaurant.id} restaurant={restaurant} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Home;
