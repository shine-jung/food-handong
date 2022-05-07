import { useCallback, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import Header from "../components/Header";
import List from "../components/List";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Home.module.css";

function Home({ auth }) {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [searchText, setSearchText] = useState("");
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
  }, []);
  return (
    <>
      <Header isLogin={isLogin} onLogout={onLogout} />
      {loading ? (
        <Box className={styles.loader}>Loading...</Box>
      ) : (
        <Box className={styles.root}>
          <Box className={styles.container}>
            <Box className={styles.searchBar}>
              <SearchIcon className={styles.searchIcon} />
              <InputBase
                className={styles.searchInput}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                autoComplete="off"
                name="search"
                placeholder="식당을 검색하세요"
              />
            </Box>
            <List searchText={searchText} restaurants={restaurants} />
          </Box>
        </Box>
      )}
    </>
  );
}

export default Home;
