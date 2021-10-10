import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./resPage.module.css";
import "antd/dist/antd.css";
import { Input, Button } from "antd";
import { onSnapshot, collection, setDoc, doc, addDoc } from "firebase/firestore";
import db from "firebase";

const { TextArea } = Input;

const RestaurantPage = ({ match }) => {
  const restaurants = useSelector((store) => store.listState.restaurants);
  const feadbacks = useSelector((store) => store.listState.feadback);
  const id = match.params.resId;
  const dispatch = useDispatch();
  const [starsCount, setStarsCount] = useState(5);
  // const [rate, setRate] = useState(0);
  const [feadback, setFeadback] = useState("");
  const [selected, setSelected] = useState({});
  useEffect(() => {
    onSnapshot(collection(db, "feadbacks"), (snapshot) => {
      let data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch({ type: "GET_FEADBACK", data });
    });
    if (id && restaurants) {
      const selectedRestaurant = restaurants.find((item) => item.id === id);
      console.log(selectedRestaurant);
      setSelected(selectedRestaurant);
    }
  }, [dispatch, restaurants, id]);
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
      {selected && (
        <div>
          <h1 className={style.name}>{selected.title}</h1>
          <img className={style.mainImg} src={selected.image} alt="" />
          <h2>To Rate The Restourant</h2>
          {[...Array(starsCount)].map((n, i) => (
            <div className={style.star} key={i} onClick={() => toRate(selected, i + 1)}></div>
          ))}
          <TextArea
            placeholder="Write Your Feadback"
            showCount
            maxLength={100}
            onChange={onChange}
            value={feadback}
          />
          <Button type="primary" onClick={() => addFeedbeack(selected.id, feadback)}>
            Send
          </Button>
          <h2>FEADBACKS</h2>
          {feadbacks
            ? feadbacks.map((text) => {
                return (
                  <div key={text.id}>
                    <p>{text.text}</p>
                  </div>
                );
              })
            : ""}
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
