import { Typography } from "@mui/material";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <Typography
      className={styles.footer}
      sx={{ display: { xs: "none", md: "flex" } }}
      variant="normal"
    >
      Copyright ⓒ 2022.&nbsp;
      <a
        className={styles.owner}
        href="https://github.com/shine-jung/"
        target="_blank"
        rel="noopener noreferrer"
      >
        shine-jung
      </a>
      .&nbsp;All Rights Reserved.
    </Typography>
  );
}

export default Footer;
