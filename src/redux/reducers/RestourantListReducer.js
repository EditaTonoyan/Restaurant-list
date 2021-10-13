const initialState = {
  restaurants: [],
  feadback: [],
  center: {
    lat: 40.183333,
    lng: 44.516667,
  },
  zoom: 11,
};
const restourantListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CENTER": {
      return {
        ...state,
        center: { ...action.data },
        zoom: 28,
      };
    }
    case "GET_RESTAURANT_LISt": {
      return {
        ...state,
        restaurants: action.list,
      };
    }
    case "GET_FEADBACK": {
      return {
        ...state,
        feadback: action.data,
      };
    }
    default:
      return state;
  }
};

export default restourantListReducer;
