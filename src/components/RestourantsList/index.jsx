import React, { useState } from "react";
import style from "./list.module.css";
import "antd/dist/antd.css";
import { Card, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Map from "components/Map";
const { Meta } = Card;

const RestourantList = () => {
  const state = useSelector((store) => store.listState);

  // console.log(state.restaurants);

  const dispatch = useDispatch();
  const [starsCount, setStarsCount] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleModal = (res) => {
    setModalInfo(res);
    showModal();
  };

  const toggleCenter = (res) => {
    const data = {
      lat: res.lat,
      lng: res.lng,
    };
    dispatch({ type: "TOGGLE_CENTER", data });
  };

  return (
    <div>
      {state.restaurants
        ? state.restaurants.map((res) => {
            return (
              <div className={style.mainLeft} key={res.id}>
                <Card
                  onClick={() => toggleCenter(res)}
                  hoverable
                  className={style.wrapper}
                  cover={<img alt="example" src={res.image} />}
                >
                  <Meta title={res.title} onClick={() => handleModal(res)} />

                  <div className={style.starsRow}>
                    {res.rate}
                    {[...Array(starsCount)].map((n, i) =>
                      i + 1 <= Math.round(res.rate) ? (
                        <div className={style.selectedStar} id={i} key={i}></div>
                      ) : (
                        <div className={style.star} id={i} key={i}></div>
                      )
                    )}
                  </div>
                  <Link to={`/restaurant/${res.id}`}>View Restaurant</Link>
                </Card>
                <hr className={style.line} />
              </div>
            );
          })
        : ""}
      <Map toggleCenter={toggleCenter} />

      <Modal
        footer={null}
        title={`Անվանում: ${modalInfo.title}`}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        Հասցե:
        {modalInfo.address}
        <a href="">View on Google Maps </a>
        );
      </Modal>
    </div>
  );
};

export default RestourantList;
