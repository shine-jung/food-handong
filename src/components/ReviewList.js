import { useEffect, useState } from "react";
import { ref, update } from "firebase/database";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import database, { firebaseAuth, firestore } from "../service/firebase";
import {
  Box,
  Paper,
  Typography,
  Rating,
  Tooltip,
  IconButton,
} from "@mui/material";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./ReviewList.module.css";

function ReviewList({ restaurant }) {
  const user = firebaseAuth.currentUser;
  const [reviewList, setReviewList] = useState([]);
  const restaurantRef = ref(database, `restaurants/${restaurant.id}`);
  const reviewsCol = collection(firestore, "reviews");
  const reviewCount = restaurant.reviewCount;
  const reviewedUser = restaurant.reviewedUser;
  const starCount = restaurant.starCount;
  const starSum = restaurant.starSum;
  useEffect(() => {
    getReviewList();
  }, [reviewCount]);
  async function getReviewList() {
    const reviewSnapshot = await getDocs(reviewsCol);
    setReviewList(
      reviewSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  }
  async function removeReview(reviewId, uid, star) {
    await updateDoc(doc(firestore, "reviews", reviewId), {
      visible: false,
    }).then(() => {
      update(restaurantRef, {
        reviewCount: reviewCount - 1,
        starCount: starCount - 1,
        starSum: starSum - star,
        reviewedUser: reviewedUser.filter((user) => user !== uid),
      });
    });
    getReviewList();
  }
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
  return (
    <>
      {reviewList
        .filter(
          (review) => review.visible && review.restaurantId === restaurant.id
        )
        .sort((a, b) => b.uploadTime - a.uploadTime)
        .map((review) => (
          <Box key={review.id} className={styles.container}>
            <img
              className={styles.profileImg}
              src={review.photoURL}
              alt={review.displayName}
            />
            <Paper className={styles.content}>
              <Box className={styles.reviewHeader}>
                <Typography
                  className={styles.reviewTitle}
                  variant="reviewTitle"
                >
                  {review.displayName}
                  <Typography className={styles.starInfo}>
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
                    <Box>{review.star}</Box>
                  </Typography>
                </Typography>
                <Typography variant="reviewTime" color="text.secondary">
                  {displayedAt(review.uploadTime.toDate())}
                </Typography>
              </Box>
              <Typography className={styles.review}>{review.review}</Typography>
              <Box className={styles.removeBtn}>
                {user.uid === review.uid && (
                  <Tooltip title="리뷰 삭제" arrow>
                    <IconButton
                      onClick={() => {
                        if (window.confirm("리뷰를 삭제하시겠습니까?")) {
                          removeReview(review.id, review.uid, review.star);
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Paper>
          </Box>
        ))}
    </>
  );
}

export default ReviewList;
