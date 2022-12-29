export const assetReducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCHING_SUCCESS":
      return {
        ...state,
        loading: false,
        assets: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "EXPAND_ASSET": {
      return {
        ...state,
        assets: state.assets.map((asset) => {
          return {
            ...asset,
            expand: action.id === asset._id ? action.expand : false,
          };
        }),
      };
    }

    case "ADD_ASSET": {
      return {
        ...state,
        assets: [...state.assets, action.payload],
      };
    }
    case "UPDATE_ASSETS":
     
      return {
        ...state,
        assets: state.assets.map((asset) => {
          if (action.id === asset._id) {
            return {
              ...asset,
              name: action.payload.name,
              value: action.payload.value,
              purchase_date: action.payload.purchase_date,
              user: action.payload.user,
              issues: action.payload.issues,
            };
          } else {
            return {
              ...asset,
              name: asset.name,
              value: asset.value,
              purchase_date: asset.purchase_date,
              user: asset.user,
              issues: asset.issues,
            };
          }
        }),
      };
    case "DELETE_ASSETS":
      return {
        ...state,
        assets: state.assets.filter((asset) => asset._id !== action.id),
      };
    default:
      return state;
  }
};
