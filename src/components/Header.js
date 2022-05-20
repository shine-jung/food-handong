import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../service/firebase";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  ButtonBase,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LoginIcon from "@mui/icons-material/Login";
import styles from "./Header.module.css";

function Header({ isLogin, onLogout }) {
  const navigate = useNavigate();
  const user = firebaseAuth.currentUser;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={styles.header} position="fixed">
        <Toolbar>
          <Tooltip title="홈 화면" arrow>
            <ButtonBase
              className={styles.logoBtn}
              onClick={() => navigate({ pathname: "/" })}
            >
              <img
                className={styles.logoImg}
                src={process.env.PUBLIC_URL + "/logo192.png"}
                alt="logo"
              />
            </ButtonBase>
          </Tooltip>
          <Typography
            className={styles.title}
            variant="h6"
            component="div"
            color="text.logo"
            sx={{ visibility: { xs: "hidden", md: "visible" } }}
          >
            한동맛나
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
            <IconButton
              href="https://docs.google.com/forms/d/e/1FAIpQLSdOSIx7dJ3IabUzJi3fIiixXLkevRdRFJvuhhlXI9FZLA_VcQ/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FeedbackIcon />
            </IconButton>
          </Tooltip>
          {isLogin ? (
            <Box>
              <Tooltip title="메뉴 열기" arrow>
                <IconButton onClick={handleOpenUserMenu}>
                  <img
                    className={styles.profile}
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "35px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    navigate({ pathname: "/dashboard" });
                    handleCloseUserMenu();
                  }}
                >
                  대시보드
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate({ pathname: "/profile" });
                    handleCloseUserMenu();
                  }}
                >
                  프로필 설정
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (window.confirm("로그아웃 하시겠습니까?")) {
                      onLogout();
                      alert("로그아웃 되었습니다");
                    }
                    handleCloseUserMenu();
                  }}
                >
                  로그아웃
                </MenuItem>
              </Menu>
            </Box>
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
