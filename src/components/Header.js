import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../service/firebase";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LoginIcon from "@mui/icons-material/Login";
import styles from "./Header.module.css";

function Header({ isLogin, onLogout }) {
  const navigate = useNavigate();
  const user = firebaseAuth.currentUser;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={styles.header} position="fixed">
        <Toolbar>
          <Tooltip title="홈 화면" arrow>
            <IconButton
              onClick={() => navigate({ pathname: "/" })}
              size="medium"
              edge="start"
              color="primary"
              aria-label="logo"
              sx={{ mr: 1.5 }}
            >
              <img
                className={styles.logo}
                src={process.env.PUBLIC_URL + "/logo.svg"}
                alt="logo"
              />
            </IconButton>
          </Tooltip>
          <Typography
            className={styles.title}
            variant="h6"
            component="div"
            color="text.logo"
          >
            한슐랭 가이드
          </Typography>
          <Tooltip title="GitHub 링크" arrow sx={{ mr: 0.5 }}>
            <IconButton
              href="https://github.com/shine-jung/hanchelin-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="피드백 남기기" arrow sx={{ mr: 0.5 }}>
            <IconButton>
              <FeedbackIcon />
            </IconButton>
          </Tooltip>
          {isLogin ? (
            <Tooltip title="로그아웃" arrow>
              <IconButton onClick={onLogout}>
                <img
                  className={styles.profile}
                  src={user.photoURL}
                  alt={user.displayName}
                />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="로그인" arrow>
              <IconButton onClick={() => navigate({ pathname: "/login" })}>
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
