import "./App.css";
import { useDispatch } from "react-redux";
import RestourantList from "./components/RestourantsList";
import RestaurantPage from "components/RestaurantPage";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useEffect } from "react";
import db from "./firebase";
import { Route, Switch } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(query(collection(db, "restaurant"), orderBy("stars", "desc")), (snapshot) => {
      let list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch({ type: "GET_RESTAURANT_LISt", list });
    });
  }, [dispatch]);
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <RestourantList />
        </Route>
        <Route exact path="/restaurant/:resId" component={RestaurantPage} />
        {/* <Route exact path="/restaurant:prestaurantId">
          <RestaurantPage />
        </Route> */}
      </Switch>

      {/* <Map /> */}
    </div>
  );
}

export default App;
