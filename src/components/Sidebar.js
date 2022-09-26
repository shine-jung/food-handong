import { Link } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
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

function Sidebar({ restaurants, reviewList, categoryText, setcategoryText }) {
  return (
    <Paper className={styles.container}>
      <Typography className={styles.title}>카테고리</Typography>
      <Typography
        className={styles.category}
        onClick={() => {
          setcategoryText("");
          window.scrollTo(0, 0);
        }}
      >
        <Box sx={{ color: categoryText === "" ? "#333" : "#777" }}>
          전체보기 (124)
        </Box>
      </Typography>
      {categoryList.map((category, index) => (
        <Typography
          key={category}
          className={styles.category}
          onClick={() => {
            setcategoryText(category);
            window.scrollTo(0, 0);
          }}
        >
          <Box sx={{ color: categoryText === category ? "#333" : "#777" }}>
            {category} ({categoryCount[index]})
          </Box>
        </Typography>
      ))}
      <Typography className={styles.title}>최근 리뷰</Typography>
      {reviewList.map((review) => (
        <Box key={review.id} className={styles.content} mb={0.5}>
          <Link
            className={styles.restaurantLink}
            to={`/restaurant/${review.restaurantId}`}
          >
            <Typography className={styles.review}>{review.review}</Typography>
            <Typography className={styles.review} variant="normal">
              {restaurants[review.restaurantId].name}
            </Typography>
          </Link>
        </Box>
      ))}
    </Paper>
  );
}

export default Sidebar;
