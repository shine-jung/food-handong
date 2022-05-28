import { useCallback, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore/lite";
import database, { firestore } from "../service/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
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
    fontFamily: ["Elice Digital Baeum", "sans-serif"].join(","),
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
  const [categoryText, setcategoryText] = useState("");
  const [sortBy, setSortBy] = useState("starAvg");
  const [recommendId, setRecommendId] = useState();
  const [restaurants, setRestaurants] = useState();
  const recommendRef = ref(database, "recommend");
  const restaurantsRef = ref(database, "restaurants");
  const [reviewList, setReviewList] = useState([]);
  const reviewsCol = collection(firestore, "reviews");
  const q = query(reviewsCol, orderBy("uploadTime", "desc"), limit(4));
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);
  useEffect(() => {
    auth.onAuthChange((user) => {
      user ? setIsLogin(true) : setIsLogin(false);
    });
    getReviewList();
    onValue(recommendRef, (snapshot) => {
      const data = snapshot.val();
      setRecommendId(data.recommendId);
    });
    onValue(restaurantsRef, (snapshot) => {
      const datas = snapshot.val();
      setRestaurants(datas);
      setLoading(false);
    });
    async function getReviewList() {
      const reviewSnapshot = await getDocs(q);
      setReviewList(
        reviewSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    }
  }, []);
  return (
    <>
      <Header isLogin={isLogin} onLogout={onLogout} />
      {loading ? (
        <Box className={styles.loader}>Loading...</Box>
      ) : (
        <Box className={styles.root}>
          <Box className={styles.container}>
            <Sidebar
              restaurants={restaurants}
              reviewList={reviewList}
              categoryText={categoryText}
              setcategoryText={setcategoryText}
            />
            <Box className={styles.headerContainer}>
              <Box className={styles.header}>
                <Box className={styles.searchBar}>
                  <SearchIcon className={styles.searchIcon} />
                  <InputBase
                    className={styles.searchInput}
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    autoComplete="off"
                    name="search"
                    placeholder="식당, 음식, 카테고리, 지역 검색"
                  />
                </Box>
                <Box className={styles.selectContainer}>
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
              </Box>
              <List
                searchText={searchText}
                categoryText={categoryText}
                sortBy={sortBy}
                restaurants={restaurants}
                recommendId={recommendId}
              />
            </Box>
          </Box>
          <Footer />
        </Box>
      )}
    </>
  );
}

export default Home;
