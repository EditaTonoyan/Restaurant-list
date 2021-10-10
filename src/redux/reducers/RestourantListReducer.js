const initialState = {
  restaurants: [],
  feadback: [],
};
const restourantListReducer = (state = initialState, action) => {
  switch (action.type) {
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
