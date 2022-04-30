import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import styles from "./Home.module.css";
import Header from "../components/Header";
import Restaurants from "../components/Restaurants";
import Profile from "../components/Profile";

function Home({ auth }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const restaurantsRef = ref(database, "restaurants");
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);
  useEffect(() => {
    auth.onAuthChange((user) => {
      !user && navigate({ pathname: "/" });
    });
    onValue(restaurantsRef, (snapshot) => {
      const datas = snapshot.val();
      setRestaurants(datas);
      setLoading(false);
    });
  }, []);
  return (
    <div className={styles.container}>
      <Header onLogout={onLogout} />
      <Profile />
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.restaurant}>
          {restaurants.map((restaurant, index) => (
            <Restaurants
              key={restaurant.id}
              index={index}
              restaurant={restaurant}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
