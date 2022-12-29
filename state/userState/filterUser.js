import { useReducer } from "react";
import userStates from "./userState";

const filterUser = () => {
  const {
    userState: { users },
  } = userStates();
  const filterReducer = (state, action) => {
    const filterUser = users.filter((user) => user._id === action.id);

    switch (action.type) {
      case "SINGLE_USER":
        return {
          ...state,
          users: filterUser,
        };
      default:
        return state;
    }
  };
  const initialState = {
    users: [],
  };
  const [filterUserState, filterDisPatch] = useReducer(
    filterReducer,
    initialState
  );

  return { filterDisPatch, filterUserState };
};

export default filterUser;
