import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./resPage.module.css";
import "antd/dist/antd.css";
import { Input, Button, Card } from "antd";
import { onSnapshot, collection, setDoc, doc, addDoc } from "firebase/firestore";
import db from "firebase";

const { TextArea } = Input;

const RestaurantPage = ({ match }) => {
  const restaurants = useSelector((store) => store.listState.restaurants);
  const feadbacks = useSelector((store) => store.listState.feadback);

  const id = match.params.resId;

  const dispatch = useDispatch();
  const [starsCount, setStarsCount] = useState(5);
  const [restaurantRate, setRestaurantRate] = useState(0);
  const [feadback, setFeadback] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState({});

  useEffect(() => {
    onSnapshot(collection(db, "feadbacks"), (snapshot) => {
      let data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch({ type: "GET_FEADBACK", data });
    });
    if (id && restaurants) {
      const selectedRestaurant = restaurants.find((item) => item.id === id);
      setSelectedRestaurant(selectedRestaurant);
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

  const toRate = async (singleRes, ratedStar) => {
    const docRef = doc(db, "restaurant", singleRes.id);
    const newStars = singleRes.stars + ratedStar;
    const newVote = singleRes.vote + 1;

    const newRate = Math.round((newStars / newVote) * 100) / 100;

    const payload = {
      ...singleRes,
      stars: newStars,
      vote: newVote,
      rate: newRate,
    };
    setDoc(docRef, payload);
    setRestaurantRate(ratedStar);
  };

  return (
    <div className={style.p_container}>
      {selectedRestaurant && (
        <div className={style.content}>
          <h1 className={style.name}>{selectedRestaurant.title}</h1>
          <img className={style.mainImg} src={selectedRestaurant.image} alt="" />
          <h2>To Rate The Restourant</h2>
          {[...Array(starsCount)].map((n, i) =>
            i + 1 <= restaurantRate ? (
              <div
                className={style.selectedStar}
                key={i}
                onClick={() => toRate(selectedRestaurant, i + 1)}
              ></div>
            ) : (
              <div
                className={style.star}
                key={i}
                onClick={() => toRate(selectedRestaurant, i + 1)}
              ></div>
            )
          )}

          <TextArea
            placeholder="Write Your Feadback"
            showCount
            maxLength={100}
            onChange={onChange}
            value={feadback}
            className={style.txt}
          />

          <Button
            className={style.btn}
            type="primary"
            onClick={() => addFeedbeack(selectedRestaurant.id, feadback)}
          >
            Send
          </Button>

          <h2 className={style.desc_ttl}>FEADBACKS</h2>

          <div className={style.desc_cont}>
            {feadbacks
              ? feadbacks.map((text) => {
                  if (id === text.restaurant_id) {
                    return (
                      <Card key={text.id}>
                        <p>{text.text}</p>
                      </Card>
                    );
                  }
                })
              : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
