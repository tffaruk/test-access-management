import { useReducer } from "react";
import courseStates from "./courseState";

const filterCourses = () => {
  const {
    courseState: { courses },
  } = courseStates();

  const filterReducer = (state, action) => {
    switch (action.type) {
      case "SINGLE_COURSES":
        return {
          ...state,
          courses: courses.filter((course) => course._id === action.id),
        };
      case "SINGLE_COURSE_ITEM":
        return {
          ...state,
          course: courses
            .filter((el) => el._id === action.id)[0]
            .course.filter((courseData) => courseData._id === action.courseId),
        };

      default:
        return state;
    }
  };
  const initialState = {
    courses: [],
    course: [],
  };
  const [filterCoursesState, filterCoursesDisPatch] = useReducer(
    filterReducer,
    initialState
  );

  return { filterCoursesDisPatch, filterCoursesState };
};

export default filterCourses;
