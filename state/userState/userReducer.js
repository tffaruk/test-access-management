export const userReducer = (state, action) => {
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
        users: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EXPAND_USER": {
      return {
        ...state,
        users: state.users.map((user) => {
          return {
            ...user,
            expand: action.id === user.id ? action.expand : false,
          };
        }),
      };
    }
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) => {
          return {
            ...user,
            name: user._id === action.id ? action.payload.name : user.name,
            email: user._id === action.id ? action.payload.email : user.email,
            depertment:
              user._id === action.id
                ? action.payload.depertment
                : user.depertment,
            phone: user._id === action.id ? action.payload.phone : user.phone,
            designation:
              user._id === action.id
                ? action.payload.designation
                : user.designation,
            joining_date:
              user._id === action.id
                ? action.payload.joining_date
                : user.joining_date,
          };
        }),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.id),
      };

    default:
      return state;
  }
};
