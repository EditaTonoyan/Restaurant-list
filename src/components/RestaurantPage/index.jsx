import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./resPage.module.css";
import { getDatabase, ref, set, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const RestaurantPage = ({ match }) => {
  const restaurants = useSelector((store) => store.listState.restaurants);
  const id = match.params.resId;
  const [starsCount, setStarsCount] = useState(5);
  const [rate, setRate] = useState(0);

  const db = getDatabase();
  const auth = getAuth();
  // jWd7UORt9DYvxUWcMwD5E3r7i9g2;
  console.log(auth);
  const updates = {};
  //updates["/restaurant/" + userId + "/DADX0T3k7dU2cIn7YRqY"] = { stars: 777 };

  if (!restaurants) {
    return (
      <section>
        <h2>Restaurant not found!</h2>
      </section>
    );
  }
  //   db.collection("restaurant").doc("8uV1cEyARjKRKjlmWNht").update({
  //     vote: 22,
  //     stars: 5,
  //   });

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
                <div
                  className={style.star}
                  key={i}
                  onClick={() => {
                    // console.log(update(ref(db), updates));
                  }}
                ></div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default RestaurantPage;
