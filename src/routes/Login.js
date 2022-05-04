import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../components/Header";
import styles from "./Login.module.css";

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
  });
  return (
    <>
      <Header isLogin={false} onLogout={false} />
      <div className={styles.container}>
        <Button onClick={onLogin} variant="contained">
          <img
            className={styles.google}
            src={process.env.PUBLIC_URL + "/google.png"}
            alt="Google Icon"
          />
          구글 계정으로 시작하기
        </Button>
      </div>
    </>
  );
}

export default Login;
