import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Restaurants({ index, restaurant }) {
  return (
    <div>
      <img
        src={restaurant.imgSrc}
        alt={restaurant.officialName}
        width="240px"
        height="200px"
        background-size="contain"
        overflow="hidden"
      />
      <Link to={`/restaurant/${index}`}>
        <h2>{restaurant.name}</h2>
      </Link>
      <p>{restaurant.category}</p>
      <p>{restaurant.dong}</p>
      <div>대표 메뉴</div>
      <ul>
        {restaurant.menus[0] && <li>{restaurant.menus[0].title}</li>}
        {restaurant.menus[1] && <li>{restaurant.menus[1].title}</li>}
      </ul>
      <div>평점: {0}</div>
      <div>좋아요 수: {0}</div>
      <div>리뷰 수: {0}</div>
    </div>
  );
}

Restaurants.propTypes = {
  index: PropTypes.number.isRequired,
  restaurant: PropTypes.object.isRequired,
};

export default Restaurants;
