import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useSelector, useDispatch } from "react-redux";
import style from "./map.module.css";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import locationIcon from "@iconify/icons-mdi/map-marker";

const MyMarkerComponent = ({ title, lat, lng }) => (
  <div className={style.mark}>
    <div className={style.mark_info}>
      <p>{title}</p>
      <p>{lat}</p>
      <p>{lng}</p>
    </div>
  </div>
);

const Map = () => {
  const { restaurants, center, zoom } = useSelector((store) => store.listState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleModal = (coord) => {
    setModalInfo(coord);
    showModal();
  };

  return (
    <div className={style.map}>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact defaultCenter={center} defaultZoom={zoom}>
          {restaurants
            ? restaurants.map((coord) => {
                return (
                  <div key={coord.id} onClick={() => handleModal(coord)} className={style.mark}>
                    <Icon style={{ width: 30, height: 30 }} icon={locationIcon} />
                    <MyMarkerComponent
                      key={coord.id}
                      lat={coord.lat}
                      lng={coord.lng}
                      title={coord.title}
                    />
                  </div>
                );
              })
            : ""}
        </GoogleMapReact>
      </div>
      <Modal
        footer={null}
        title={`Անվանում: ${modalInfo.title}`}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        Հասցե:
        {modalInfo.address}
      </Modal>
    </div>
  );
};
export default Map;
