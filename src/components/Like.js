import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue, update } from "firebase/database";
import database, { firebaseAuth } from "../service/firebase";
import { Tooltip, ButtonBase } from "@mui/material";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Like.module.css";

function Like({ restaurant }) {
  const navigate = useNavigate();
  const user = firebaseAuth.currentUser;
  const restaurantRef = ref(database, `restaurants/${restaurant.id}`);
  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState();
  const [likedUser, setLikedUser] = useState();
  useEffect(() => {
    onValue(restaurantRef, (snapshot) => {
      const data = snapshot.val();
      setIsLiked(user && data.likedUser && data.likedUser.includes(user.uid));
      setLikes(data.likes);
      setLikedUser(data.likedUser);
    });
  }, []);
  async function likeBtnClick() {
    if (!user) {
      if (window.confirm("로그인 하시겠습니까?"))
        navigate({ pathname: "/login" });
      return;
    }
    const uid = user.uid;
    if (isLiked) {
      await update(restaurantRef, {
        likes: likes - 1,
        likedUser: likedUser.filter((user) => user !== uid),
      });
    } else {
      await update(restaurantRef, {
        likes: likes + 1,
        likedUser: likedUser ? [...likedUser, uid] : [uid],
      });
    }
  }
  return (
    <>
      <Tooltip title={isLiked ? "좋아요 취소" : "좋아요"} placement="top" arrow>
        <ButtonBase
          onClick={likeBtnClick}
          sx={{
            color: isLiked ? "#ff6666" : "rgb(218, 218, 218)",
          }}
          disableRipple
        >
          <FontAwesomeIcon className={styles.likeBtn} icon={faHeart} />
        </ButtonBase>
      </Tooltip>
    </>
  );
}

export default Like;
