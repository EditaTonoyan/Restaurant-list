import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./resPage.module.css";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import db from "firebase";

const RestaurantPage = ({ match }) => {
  const restaurants = useSelector((store) => store.listState.restaurants);
  const id = match.params.resId;
  const [starsCount, setStarsCount] = useState(5);
  const [rate, setRate] = useState(0);

  if (!restaurants) {
    return (
      <section>
        <h2>Restaurant not found!</h2>
      </section>
    );
  }

  const addFeedbeack = async () => {
    const collectionRef = collection(db, "restaurant");
    const payload = {
      imag: "https://yvn.reservin.am/uploads/place/10336/modified/thumb_440x330_a56eee6e8a93d9fa3620cee019f4c88e.jpg",
      lat: 40.1893,
      lng: 44.5124,
      stars: "999",
      title: "test",
      vote: "777",
    };
    await addDoc(collectionRef, payload);
  };

  const toRate = async (id) => {
    const docRef = doc(db, "restaurant", id);
    const payload = {
      stars: "777999",
      vote: "11111",
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
                <div className={style.star} key={i} onClick={toRate(singleRes.id)}></div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default RestaurantPage;
