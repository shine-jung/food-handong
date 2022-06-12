import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import database, { firebaseAuth, firestore } from "../service/firebase";
import { ref, onValue } from "firebase/database";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Paper, Grid, Typography, Rating } from "@mui/material";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import styles from "./Dashboard.module.css";
import Restaurant from "../components/Restaurant";

function Dashboard({ auth }) {
  const user = firebaseAuth.currentUser;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const reviewsCol = collection(firestore, "reviews");
  const [restaurantsObj, setRestaurantsObj] = useState({});
  const restaurantsRef = ref(database, "restaurants");
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);
  useEffect(() => {
    auth.onAuthChange((user) => {
      if (user) {
        setIsLogin(true);
        const q = query(reviewsCol, where("uid", "==", user.uid));
        onValue(restaurantsRef, (snapshot) => {
          const datas = snapshot.val();
          setRestaurantsObj(datas);
          setLoading(false);
        });
        getReviewList(q);
      } else {
        setIsLogin(false);
        navigate({ pathname: "/" });
      }
    });
    async function getReviewList(query) {
      const reviewSnapshot = await getDocs(query);
      setReviewList(
        reviewSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    }
  }, []);
  // https://gofnrk.tistory.com/117
  function displayedAt(uploadTime) {
    const milliSeconds = new Date() - uploadTime;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  }
  const getStarAvg = (obj) => (obj.starCount ? obj.starSum / obj.starCount : 0);
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
                <Typography className={styles.title} variant="h6">
                  내가 좋아요 한 식당들
                </Typography>
                {Object.values(restaurantsObj)
                  .filter((restaurant) =>
                    restaurant.likedUser?.includes(user.uid)
                  )
                  .sort((a, b) => {
                    if (
                      a.reviewCount === b.reviewCount &&
                      getStarAvg(a) === getStarAvg(b)
                    )
                      return b.likes - a.likes;
                    if (getStarAvg(a) === getStarAvg(b))
                      return b.reviewCount - a.reviewCount;
                    return getStarAvg(b) - getStarAvg(a);
                  })
                  .map((restaurant) => (
                    <Box key={restaurant.id} className={styles.restaurant}>
                      <Link
                        className={styles.restaurantLink}
                        to={`/restaurant/${restaurant.id}`}
                      >
                        <Restaurant restaurant={restaurant} />
                      </Link>
                    </Box>
                  ))}
              </Grid>
              <Grid item xs={6}>
                <Typography className={styles.title} variant="h6">
                  내가 쓴 리뷰
                </Typography>
                {reviewList
                  .sort((a, b) => b.uploadTime - a.uploadTime)
                  .map((review) => (
                    <Link
                      key={review.id}
                      className={styles.restaurantLink}
                      to={`/restaurant/${review.restaurantId}`}
                    >
                      <Box className={styles.reviewcontainer}>
                        <img
                          className={styles.profileImg}
                          src={review.photoURL}
                          alt={review.displayName}
                        />
                        <Paper className={styles.content}>
                          <Box className={styles.reviewHeader}>
                            <Typography
                              className={styles.reviewTitle}
                              variant="normal"
                            >
                              {review.displayName}
                              <Box className={styles.starInfo}>
                                <Rating
                                  className={styles.stars}
                                  value={review.star}
                                  readOnly
                                  icon={
                                    <FontAwesomeIcon
                                      className={styles.starIcon}
                                      icon={faStar}
                                    />
                                  }
                                  emptyIcon={
                                    <FontAwesomeIcon
                                      className={styles.starIcon}
                                      style={{ opacity: 0.55 }}
                                      icon={faStar}
                                    />
                                  }
                                />
                                <Typography>{review.star}</Typography>
                              </Box>
                            </Typography>
                            <Typography variant="normal" color="text.secondary">
                              {displayedAt(review.uploadTime.toDate())}
                            </Typography>
                          </Box>
                          <Typography className={styles.review} gutterBottom>
                            {review.review}
                          </Typography>
                          <Typography
                            className={styles.restaurantName}
                            color="secondary"
                          >
                            {restaurantsObj[review.restaurantId].name}
                            <NorthEastIcon />
                          </Typography>
                        </Paper>
                      </Box>
                    </Link>
                  ))}
              </Grid>
            </Grid>
          </Box>
          <Footer />
        </Box>
      )}
    </>
  );
}

export default Dashboard;
