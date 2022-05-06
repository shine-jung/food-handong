import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const { kakao } = window;

const Map = ({ name, lat, lon, centerLocation }) => {
  const [userPosition, setUserPosition] = useState({
    latitude: 36.103116,
    longitude: 129.388368,
  }); // Handong University
  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    setUserPosition({
      latitude,
      longitude,
    });
  };
  const handleError = () => {
    console.log("위치 권한을 허용해 주세요");
  };
  useEffect(() => {
    const { geolocation } = navigator;
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 2,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(lat, lon));
    bounds.extend(
      new kakao.maps.LatLng(userPosition.latitude, userPosition.longitude)
    );
    const zoomControl = new kakao.maps.ZoomControl();
    const positions = [
      {
        title: "내 위치",
        latlng: new kakao.maps.LatLng(
          userPosition.latitude,
          userPosition.longitude
        ),
      },
      {
        title: name,
        latlng: new kakao.maps.LatLng(lat, lon),
      },
    ];
    const userMarker = new kakao.maps.Marker({
      position: positions[0].latlng,
      title: positions[0].title,
    });
    const restaurantMarker = new kakao.maps.Marker({
      position: positions[1].latlng,
      title: positions[1].title,
    });
    geolocation.getCurrentPosition(handleSuccess, handleError);
    centerLocation && map.setBounds(bounds);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    userMarker.setMap(map);
    restaurantMarker.setMap(map);
  }, [
    name,
    lat,
    lon,
    centerLocation,
    userPosition.latitude,
    userPosition.longitude,
  ]);
  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
      }}
    ></div>
  );
};

Map.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  centerLocation: PropTypes.bool.isRequired,
};

export default Map;
