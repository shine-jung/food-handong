import { useCallback, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import List from "../components/List";
import { Box, InputBase, Select, MenuItem, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Home.module.css";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 10,
    backgroundColor: "white",
    border: "1px solid #dfe1e5",
    fontSize: 16,
    color: "text.primary",
    padding: "10px 26px 10px 17px",
    fontFamily: ["EliceDigitalBaeum", "sans-serif"].join(","),
    transition: theme.transitions.create([
      "border-radius",
      "border-color",
      "box-shadow",
    ]),
    "&:focus": {
      borderRadius: 10,
    },
    "&:hover": {
      borderColor: "rgba(223, 225, 229, 0)",
      boxShadow: "0 1px 6px rgba(32, 33, 36, 0.28)",
    },
  },
}));

function Home({ auth }) {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("starAvg");
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
      const datas = Object.values(snapshot.val());
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
            <Box className={styles.header}>
              <Box className={styles.searchBar}>
                <SearchIcon className={styles.searchIcon} />
                <InputBase
                  className={styles.searchInput}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  autoComplete="off"
                  name="search"
                  placeholder="식당,음식,분류,지역 검색"
                />
              </Box>
              <Select
                className={styles.select}
                value={sortBy}
                label="정렬"
                onChange={(e) => setSortBy(e.target.value)}
                input={<BootstrapInput />}
              >
                <MenuItem value={"starAvg"}>별점순</MenuItem>
                <MenuItem value={"likes"}>좋아요순</MenuItem>
                <MenuItem value={"reviewCount"}>리뷰개수순</MenuItem>
                <MenuItem value={"name"}>식당이름순</MenuItem>
              </Select>
            </Box>
            <List
              searchText={searchText}
              sortBy={sortBy}
              restaurants={restaurants}
            />
          </Box>
          <Footer />
        </Box>
      )}
    </>
  );
}

export default Home;
