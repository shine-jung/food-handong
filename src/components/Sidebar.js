import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../service/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { Box, Paper, Typography, MenuList, MenuItem } from "@mui/material";
import styles from "./Sidebar.module.css";

const categoryList = [
  "한식",
  "회·일식",
  "중식",
  "양식",
  "아시안",
  "분식",
  "육류",
  "치킨",
  "술집",
  "카페",
  "디저트",
];
const categoryCount = [31, 26, 12, 13, 2, 5, 18, 3, 5, 7, 2];

function Sidebar({ restaurants, categoryText, setcategoryText }) {
  const [loading, setLoading] = useState(true);
  const [reviewList, setReviewList] = useState([]);
  const reviewsCol = collection(firestore, "reviews");
  useEffect(() => {
    getReviewList();
    setLoading(false);
    async function getReviewList() {
      const reviewSnapshot = await getDocs(reviewsCol);
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
      {loading ? (
        <Box className={styles.loader}>Loading...</Box>
      ) : (
        <Paper className={styles.container}>
          <Typography className={styles.title}>카테고리</Typography>
          <MenuList dense>
            <MenuItem
              className={styles.category}
              onClick={() => setcategoryText("")}
            >
              <Box sx={{ color: categoryText === "" ? "#333" : "#777" }}>
                전체보기 (124)
              </Box>
            </MenuItem>
            {categoryList.map((category, index) => (
              <MenuItem
                key={category}
                className={styles.category}
                onClick={() => setcategoryText(category)}
              >
                <Box
                  sx={{ color: categoryText === category ? "#333" : "#777" }}
                >
                  {category} ({categoryCount[index]})
                </Box>
              </MenuItem>
            ))}
          </MenuList>
          <Typography className={styles.title}>최근 리뷰</Typography>
          {reviewList
            .filter((review) => review.visible)
            .sort((a, b) => b.uploadTime - a.uploadTime)
            .slice(0, 4)
            .map((review) => (
              <Box key={review.id} className={styles.content}>
                <Link
                  className={styles.restaurantLink}
                  to={`/restaurant/${review.restaurantId}`}
                >
                  <Typography className={styles.review}>
                    {review.review}
                  </Typography>
                  <Typography variant="normal">
                    {restaurants[review.restaurantId].name}
                  </Typography>
                </Link>
              </Box>
            ))}
        </Paper>
      )}
    </>
  );
}

export default Sidebar;
