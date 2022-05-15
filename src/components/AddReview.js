import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, update } from "firebase/database";
import { collection, addDoc } from "firebase/firestore/lite";
import database, { firebaseAuth, firestore } from "../service/firebase";
import { Box, Button, Rating, Typography, InputBase } from "@mui/material";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AddReview.module.css";

const labels = {
  0: "이 식당을 평가해주세요!",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function AddReview({ restaurant }) {
  const navigate = useNavigate();
  const user = firebaseAuth.currentUser;
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  const restaurantRef = ref(database, `restaurants/${restaurant.id}`);
  const reviewsCol = collection(firestore, "reviews");
  const reviewCount = restaurant.reviewCount;
  const reviewedUser = restaurant.reviewedUser;
  const starCount = restaurant.starCount;
  const starSum = restaurant.starSum;
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
    resetValues();
  }
  const resetValues = () => {
    setStar(0);
    setReview("");
  };
  return (
    <>
      <Box className={styles.rateBar}>
        <Typography gutterBottom>{labels[star ? star : 0]}</Typography>
        <Rating
          value={star}
          onChange={(event, newValue) => {
            setStar(newValue);
          }}
          icon={<FontAwesomeIcon className={styles.starIcon} icon={faStar} />}
          emptyIcon={
            <FontAwesomeIcon
              className={styles.starIcon}
              style={{ opacity: 0.55 }}
              icon={faStar}
            />
          }
        />
      </Box>
      <InputBase
        className={styles.reviewText}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        multiline
        rows={3}
        placeholder="리뷰를 적어주세요"
      />
      <Box className={styles.reviewBtnContainer}>
        <Button onClick={addReview} variant="contained" color="secondary">
          리뷰 추가
        </Button>
      </Box>
    </>
  );
}

export default AddReview;
