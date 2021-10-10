import React, { useState } from "react";
import style from "./list.module.css";
import "antd/dist/antd.css";
import { Card } from "antd";
import { useSelector } from "react-redux";
import ModalWindow from "components/Modal";
import { Link } from "react-router-dom";
import Map from "components/Map";
const { Meta } = Card;

const RestourantList = () => {
  const restaurants = useSelector((store) => store.listState.restaurants);
  const [starsCount, setStarsCount] = useState(5);

  return (
    <div>
      <a href="">
        <img src="" alt="" />
      </a>
      {restaurants
        ? restaurants.map((res) => {
            return (
              <div key={res.id}>
                <Card
                  hoverable
                  className={style.wrapper}
                  cover={<img alt="example" src={res.image} />}
                >
                  <Meta title={res.title} />
                  <div className={style.starsRow}>
                    {[...Array(starsCount)].map((n, i) => (
                      <div className={style.star} id={i} key={i}></div>
                    ))}
                  </div>
                  <Link to={`/restaurant/${res.id}`}>
                    <p>View Restaurant </p>
                  </Link>
                </Card>
                <hr className={style.line} />
              </div>
            );
          })
        : ""}
      <Map />
    </div>
  );
};

export default RestourantList;
