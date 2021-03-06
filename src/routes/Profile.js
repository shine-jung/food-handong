import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { firebaseAuth } from "../service/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import styles from "./Profile.module.css";

function Profile({ auth }) {
  const user = firebaseAuth.currentUser;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState();
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);
  const saveProfile = async () => {
    if (!newDisplayName) {
      alert("새로운 이름을 입력해주세요");
      return;
    }
    if (user.displayName !== newDisplayName) {
      await updateProfile(user, {
        displayName: newDisplayName,
      }).then(() => {
        alert("프로필이 업데이트 되었습니다");
        navigate({ pathname: "/" });
      });
    }
  };
  useEffect(() => {
    auth.onAuthChange((user) => {
      if (user) {
        setIsLogin(true);
        setNewDisplayName(user.displayName);
        setLoading(false);
      } else {
        setIsLogin(false);
        navigate({ pathname: "/" });
      }
    });
  }, []);
  return (
    <>
      <Header isLogin={isLogin} onLogout={onLogout} />
      {loading ? (
        <Box className={styles.loader}>Loading...</Box>
      ) : (
        <Box className={styles.root}>
          <Paper className={styles.container}>
            <Typography className={styles.title} variant="h6">
              Profile
            </Typography>
            <Box className={styles.imgContainer}>
              <img
                className={styles.profileImg}
                src={user.photoURL}
                alt={user.displayName}
              />
            </Box>
            <TextField
              className={styles.textField}
              disabled
              value={user.email}
              label="Email"
              color="secondary"
              size="small"
              fullWidth
            />
            <TextField
              className={styles.textField}
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              label="Name"
              placeholder="새로운 이름을 적어주세요"
              color="secondary"
              size="small"
              fullWidth
            />
            <Box className={styles.submitBtnContainer}>
              <Button
                onClick={saveProfile}
                variant="contained"
                color="secondary"
              >
                저장
              </Button>
            </Box>
          </Paper>
          <Box className={styles.footer}>
            <Footer />
          </Box>
        </Box>
      )}
    </>
  );
}

export default Profile;
