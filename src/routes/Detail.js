import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import styles from "./Detail.module.css";
import Map from "../components/Map";

function Detail() {
  const { id } = useParams();
  const days = ["매일", "일", "월", "화", "수", "목", "금", "토"];
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState({});
  const restaurantRef = ref(database, `restaurants/${id}`);
  useEffect(() => {
    onValue(restaurantRef, (snapshot) => {
      const data = snapshot.val();
      setRestaurant(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <a
            href={restaurant.naverUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {restaurant.officialName}
          </a>
          <p>{restaurant.category}</p>
          <p>{restaurant.dong}</p>
          <p>{restaurant.location}</p>
          <div>
            {days
              .filter((day) => restaurant.openingHours[day])
              .map((day, index) => (
                <div key={index}>
                  {day} :
                  <div>
                    {restaurant.openingHours[day]
                      .split("\n")
                      .map((line, index) => (
                        <div key={index}>
                          {line}
                          <br />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
          <div>
            {restaurant.menus.map((menu, index) => (
              <li key={index}>
                {menu.title} {menu.price}
                {menu.imgSrc && (
                  <img
                    src={menu.imgSrc}
                    alt={menu.title}
                    width="150px"
                    height="150px"
                  />
                )}
              </li>
            ))}
          </div>
          <p>{restaurant.updateDate}</p>
          <Map lat={restaurant.lat} lon={restaurant.lon} />
        </div>
      )}
    </div>
  );
}

export default Detail;
