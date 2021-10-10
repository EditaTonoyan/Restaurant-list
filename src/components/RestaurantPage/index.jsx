import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./resPage.module.css";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import db from "firebase";
import "antd/dist/antd.css";
import { Input, Button } from "antd";

const { TextArea } = Input;

const RestaurantPage = ({ match }) => {
  const restaurants = useSelector((store) => store.listState.restaurants);
  const id = match.params.resId;
  const [starsCount, setStarsCount] = useState(5);
  const [rate, setRate] = useState(0);
  const [feadback, setFeadback] = useState("");

  if (!restaurants) {
    return (
      <section>
        <h2>Restaurant not found!</h2>
      </section>
    );
  }

  const onChange = (e) => {
    setFeadback(e.target.value);
  };
  const addFeedbeack = async (id, feadback) => {
    const collectionRef = collection(db, "feadbacks");
    const payload = {
      restaurant_id: id,
      text: feadback,
    };
    await addDoc(collectionRef, payload);
    setFeadback("");
  };

  const toRate = async (singleRes, rate) => {
    const docRef = doc(db, "restaurant", singleRes.id);
    const newStars = singleRes.stars + rate;
    const newVote = singleRes.vote + 1;
    const payload = {
      ...singleRes,
      stars: newStars,
      vote: newVote,
    };
    setDoc(docRef, payload);
  };

  return (
    <div>
      {restaurants.map((singleRes) => {
        if (singleRes.id == id) {
          return (
            <div>
              <h1 className={style.name}>{singleRes.title}</h1>
              <img className={style.mainImg} src={singleRes.image} alt="" />
              <h2>To Rate The Restourant</h2>
              {[...Array(starsCount)].map((n, i) => (
                <div className={style.star} key={i} onClick={() => toRate(singleRes, i + 1)}></div>
              ))}
              <TextArea
                placeholder="Write Your Feadback"
                showCount
                maxLength={100}
                onChange={onChange}
                value={feadback}
              />
              <Button type="primary" onClick={() => addFeedbeack(singleRes.id, feadback)}>
                Send
              </Button>
              <h2>FEADBACKS</h2>
            </div>
          );
        }
      })}
    </div>
  );
};

export default RestaurantPage;
