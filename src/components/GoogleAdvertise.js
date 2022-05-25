import { useEffect } from "react";
import { Paper } from "@mui/material";
import styles from "./GoogleAdvertise.module.css";

function GoogleAdvertise() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("Advertise is pushed");
    } catch (e) {
      if (process.env.NODE_ENV !== "production")
        console.error("AdvertiseError", e);
    }
  }, []);
  if (process.env.NODE_ENV !== "production")
    return (
      <Paper className={styles.paper}>
        <div
          style={{
            width: "100%",
            backgroundColor: "#eeeeee",
            padding: "16px",
          }}
        >
          광고 표시 영역
        </div>
      </Paper>
    );
  return (
    <Paper className={styles.paper}>
      <ins
        className="adsbygoogle"
        style={{
          width: "100%",
          display: "block",
          overflowX: "hidden",
          overflowY: "hidden",
          backgroundColor: "#eeeeee",
          textAlign: "center",
        }}
        data-ad-client="ca-pub-8285898152291282"
        data-ad-slot="1126850383"
        data-ad-format="fluid"
        data-full-width-responsive="-fe+u+2-p5+1bl"
        data-ad-layout-key=""
      />
    </Paper>
  );
}

export default GoogleAdvertise;
