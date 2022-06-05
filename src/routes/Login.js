import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Login.module.css";

function Login({ auth }) {
  const navigate = useNavigate();
  const onLogin = () => {
    auth.login();
  };
  useEffect(() => {
    auth.onAuthChange((user) => {
      user && navigate({ pathname: "/" });
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
          backgroundImage: `url(${process.env.PUBLIC_URL + "/background.jpg"})`,
        }}
      >
        <Paper className={styles.container}>
          <Typography className={styles.text} variant="normal">
            <Box>카카오, 에타 브라우저에서는</Box>
            <Box>로그인을 지원하지 않습니다.</Box>
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
