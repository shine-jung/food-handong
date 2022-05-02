import { useEffect } from "react";
import PropTypes from "prop-types";

const { kakao } = window;

const Map = ({ lat, lon }) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 2,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const markerPosition = new kakao.maps.LatLng(lat, lon);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);
  return (
    <div
      id="map"
      style={{
        width: "700px",
        height: "400px",
      }}
    ></div>
  );
};

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default Map;
