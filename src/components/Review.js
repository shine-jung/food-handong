import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, update } from "firebase/database";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore/lite";
import database, { firebaseAuth, firestore } from "../service/firebase";
import {
  Box,
  Button,
  Paper,
  Rating,
  Typography,
  InputBase,
  Tooltip,
  IconButton,
} from "@mui/material";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Review.module.css";

const labels = {
  0: "이 식당을 평가해주세요!",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function Review({ restaurant }) {
  const navigate = useNavigate();
  const user = firebaseAuth.currentUser;
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const restaurantRef = ref(database, `restaurants/${restaurant.id}`);
  const reviewsCol = collection(firestore, "reviews");
  const reviewCount = restaurant.reviewCount;
  const reviewedUser = restaurant.reviewedUser;
  const starCount = restaurant.starCount;
  const starSum = restaurant.starSum;
  useEffect(() => {
    getReviewList();
  }, []);
  async function addReview() {
    if (!user) {
      if (window.confirm("로그인 하시겠습니까?"))
        navigate({ pathname: "/login" });
      return;
    }
    if (restaurant.reviewedUser && restaurant.reviewedUser.includes(user.uid)) {
      alert("이미 리뷰를 작성하셨습니다 🥺");
      return;
    }
    if (!star) {
      alert("별점을 매겨주세요 🥺");
      return;
    }
    await addDoc(reviewsCol, {
      star: star,
      review: review,
      uploadTime: new Date(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      restaurantId: restaurant.id,
      visible: true,
    }).then(() => {
      update(restaurantRef, {
        reviewCount: reviewCount + 1,
        starCount: starCount + 1,
        starSum: starSum + star,
        reviewedUser: reviewedUser ? [...reviewedUser, user.uid] : [user.uid],
      });
    });
    getReviewList();
    resetValues();
  }
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
    await deleteDoc(doc(firestore, "reviews", reviewId)).then(() => {
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
  const resetValues = () => {
    setStar(0);
    setReview("");
  };
  return (
    <>
      <Paper className={styles.section}>
        <Box className={styles.formRateBar}>
          <Typography gutterBottom>{labels[star ? star : 0]}</Typography>
          <Rating
            value={star}
            onChange={(event, newValue) => {
              setStar(newValue);
            }}
            icon={
              <FontAwesomeIcon className={styles.formStarIcon} icon={faStar} />
            }
            emptyIcon={
              <FontAwesomeIcon
                className={styles.formStarIcon}
                style={{ opacity: 0.55 }}
                icon={faStar}
              />
            }
          />
        </Box>
        <InputBase
          className={styles.formReviewText}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          multiline
          rows={3}
          placeholder="리뷰를 적어주세요"
        />
        <Box className={styles.addBtnContainer}>
          <Button onClick={addReview} variant="contained" color="secondary">
            리뷰 추가
          </Button>
        </Box>
      </Paper>
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
                <Typography className={styles.reviewTitle} variant="normal">
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
              <Typography className={styles.review}>{review.review}</Typography>
              <Box className={styles.removeBtn}>
                {user && user.uid === review.uid && (
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

export default Review;
