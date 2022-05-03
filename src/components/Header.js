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
import LogoutIcon from "@mui/icons-material/Logout";

function Header({ onLogout }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 2 }}
          >
            <img
              src={process.env.PUBLIC_URL + "/logo.svg"}
              alt="logo"
              height={36}
            />
          </IconButton>
          <Typography
            className="title"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Hanchelin Guide
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
          <Tooltip title="로그아웃" arrow>
            <IconButton onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
