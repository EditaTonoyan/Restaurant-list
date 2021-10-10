const initialState = {
  center: {
    lat: 40.183333,
    lng: 44.516667,
  },
  coordinates: [
    {
      id: 1,
      lat: 40.173029,
      lng: 44.511452,
      text: "Yerevan Pandok",
    },
    {
      id: 2,
      lat: 40.20629637477189,
      lng: 44.50161869131926,
      text: "Genacvale pandok",
    },
    {
      id: 3,
      lat: 40.186466034801825,
      lng: 30.22,
      text: "Afrikyanneri Restaurant ",
    },

    {
      id: 5,
      lat: 40.26404803301545,
      lng: 44.566955384654506,
      text: "Villa hells",
    },
  ],
  zoom: 11,
};
const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default mapReducer;
