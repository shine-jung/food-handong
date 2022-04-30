import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import database from "../service/firebase";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const restaurantsRef = ref(database, "restaurants");
  useEffect(() => {
    onValue(restaurantsRef, (snapshot) => {
      const datas = snapshot.val();
      setRestaurants(datas);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {restaurants.map((data, index) => (
            <h2 key={index}>
              <Link to={`/restaurant/${index}`}>{data.name}</Link>
            </h2>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
