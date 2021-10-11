import React, { useState } from "react";
import style from "./list.module.css";
import "antd/dist/antd.css";
import { Card, Modal } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Map from "components/Map";
const { Meta } = Card;

const RestourantList = () => {
  const restaurants = useSelector((store) => store.listState.restaurants);

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

  return (
    <div>
      {restaurants
        ? restaurants.map((res) => {
            return (
              <div className={style.mainLeft} key={res.id}>
                <Card
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
      <Map />

      <Modal
        footer={null}
        title={`Անվանում: ${modalInfo.title}`}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        Հասցե:
        {modalInfo.address}
        );
      </Modal>
    </div>
  );
};

export default RestourantList;
