import { useEffect } from "react";
import { Tooltip, ButtonBase } from "@mui/material";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./KakaoShare.module.css";

function KakaoShare({ restaurant }) {
  const url = `https://food.handong.us/restaurant/${restaurant.id}`;
  useEffect(() => {
    initKakao();
  }, []);
  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_TOKEN);
      }
    }
  };
  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "location",
      address: restaurant.location,
      addressTitle: restaurant.officialName,
      content: {
        title: restaurant.name,
        description: `#${restaurant.dong} #${restaurant.category} #${restaurant.menus[0].title}`,
        imageUrl: restaurant.imgSrc,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      social: {
        likeCount: restaurant.likes,
        commentCount: restaurant.reviewCount,
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };
  return (
    <>
      <Tooltip title="카카오톡 공유" placement="top" arrow>
        <ButtonBase onClick={shareKakao} disableRipple>
          <FontAwesomeIcon className={styles.kakaoBtn} icon={faShareNodes} />
        </ButtonBase>
      </Tooltip>
    </>
  );
}

export default KakaoShare;
