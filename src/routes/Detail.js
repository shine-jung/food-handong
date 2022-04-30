import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";

function Detail() {
  const { id } = useParams();
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
    <div>
      {loading ? (
        <h1>Loading...</h1>
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
        </div>
      )}
    </div>
  );
}

export default Detail;
