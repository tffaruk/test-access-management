import { useReducer } from "react";
import assetStates from "./assetState";

const filterAssets = () => {
  const {
    assetState: { assets },
  } = assetStates();

  const filterReducer = (state, action) => {
    switch (action.type) {
      case "SINGLE_ASSET":
        return {
          ...state,
          assets: assets.filter((asset) => asset._id === action.id),
        };

      default:
        return state;
    }
  };
  const initialState = {
    assets: [],
  };
  const [filterAssetsState, filterAssetsDisPatch] = useReducer(
    filterReducer,
    initialState
  );

  return { filterAssetsDisPatch, filterAssetsState };
};

export default filterAssets;
