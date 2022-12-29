import Axios from "@/lib/axios";
import { useEffect, useReducer } from "react";
import { courseReducer } from "./courseReducer";

const coursesState = () => {
  const initialState = {
    loading: false,
    courses: [],
    error: false,
  };
  const [courseState, courseDispatch] = useReducer(courseReducer, initialState);
  useEffect(() => {
    courseDispatch({
      type: "FETCHING_START",
    });
    Axios.get("course")
      .then((data) =>
        courseDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.courses.map((course) => {
            return { ...course, expand: false };
          }),
        })
      )
      .catch(() => courseDispatch({ type: "FETCHING_FAILED" }));
  }, []);
  return {
    courseState: courseState,
    courseDispatch: courseDispatch,
  };
};

export default coursesState;
