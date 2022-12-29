export const courseReducer = (state, action) => {

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
        courses: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EXPAND_COURSE": {
      return {
        ...state,
        courses: state.courses.map((course) => {
          return {
            ...course,
            expand: action.id === course._id ? action.expand : false,
          };
        }),
      };
    }

    case "ADD_COURSE": {
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    }
    case "UPDATE_COURSE":
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (action.id === course._id) {
            return {
              ...course,
              name: action.payload.name,
              prize: action.payload.prize,
              course: action.payload.course,
            };
          } else {
            return {
              ...course,
              name: course.name,
              prize: course.prize,
              course: course.course,
            };
          }
        }),
      };
    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== action.id),
      };
    case "UPDATE_SINGLE_COURSE":
      return {
        ...state,
        courses: state.courses.map((course) => {
          {
            return {
              ...course,
              course: course.course.map((org) => {
                if (org._id === action.id) {
                  return {
                    ...org,
                    name: action.payload.name,
                    user: action.payload.user,
                    prize: action.payload.prize,
                  };
                } else {
                  return {
                    ...org,
                    name: org.name,
                    user: org.user,
                    prize: org.prize,
                  };
                }
              }),
            };
          }
        }),
      };
    case "DELETE_SINGLE_COURSE":
      return {
        ...state,
        courses: state.courses.map((el) => {
          return {
            ...el,
            course: el.course.filter(
              (courseData) => courseData._id !== action.id
            ),
          };
        }),
      };
    default:
      return state;
  }
};
