import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import style from "./map.module.css";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

const MyMarkerComponent = ({ text }) => <div className={style.text}>{text}</div>;
const Map = () => {
  const center = useSelector((store) => store.mapState.center);
  const zoom = useSelector((store) => store.mapState.zoom);
  const restaurants = useSelector((store) => store.listState.restaurants);

  return (
    <div className={style.map}>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact defaultCenter={center} defaultZoom={zoom}>
          {restaurants
            ? restaurants.map((coord) => {
                return (
                  <div className={style.mark}>
                    <Icon style={{ width: 30, height: 30 }} icon={locationIcon} />
                    <MyMarkerComponent
                      key={coord.id}
                      lat={coord.lat}
                      lng={coord.lng}
                      text={coord.title}
                    />
                  </div>
                );
              })
            : ""}
        </GoogleMapReact>
      </div>
    </div>
  );
};
export default Map;
