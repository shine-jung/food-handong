import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Login.module.css";

const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];

function Login({ auth }) {
  const navigate = useNavigate();
  const onLogin = () => {
    auth.login().then((data) => goToHome(data.user.uid));
  };
  const goToHome = (userId) => {
    navigate({ pathname: "/", state: { id: userId } });
  };
  useEffect(() => {
    auth.onAuthChange((user) => {
      user && goToHome(user.uid);
    });
  }, []);
  return (
    <>
      <Header isLogin={false} onLogout={false} />
      <Box
        className={styles.root}
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${
            process.env.PUBLIC_URL + `/img/${chosenImage}`
          })`,
        }}
      >
        <Paper className={styles.container}>
          <Typography className={styles.text} variant="h6">
            <Box>밥고 뭐 먹을지 고민 될 땐?</Box>
            <Box>한동맛나!</Box>
          </Typography>
          <Button onClick={onLogin} variant="contained" color="secondary">
            <img
              className={styles.google}
              src={process.env.PUBLIC_URL + "/google.svg"}
              alt="Google Icon"
            />
            구글 계정으로 시작하기
          </Button>
        </Paper>
        <Box className={styles.footer}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Login;
