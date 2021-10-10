const initialState = {
  restaurants: [],
};
const restourantListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RESTAURANT_LISt": {
      return {
        ...state,
        restaurants: action.list,
      };
    }
    default:
      return state;
  }
};

export default restourantListReducer;
