import Axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useReducer } from "react";
import { userReducer } from "state/userState/userReducer";

const userStates = () => {
  const { data: session } = useSession();

  const initialState = {
    loading: false,
    users: [],
    error: false,
  };
  const [userState, userDispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    userDispatch({
      type: "FETCHING_START",
    });
    Axios.get("user", {
      headers: {
        permission: session?.session.user.email,
      },
    })
      .then((data) =>
        userDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.users
            // .filter((el) => el.email === session.session.user.email)
            .map((user) => {
              return { ...user, expand: false };
            }),
        })
      )
      .catch(() => userDispatch({ type: "FETCHING_FAILED" }));
  }, []);
  return {
    userState: userState,
    userDispatch: userDispatch,
  };
};

export default userStates;
