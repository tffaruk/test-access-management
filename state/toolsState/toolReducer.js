export const toolReducer = (state, action) => {
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
        tools: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "EXPAND_TOOL": {
      return {
        ...state,
        tools: state.tools.map((tool) => {
          return {
            ...tool,
            expand: action.id === tool._id ? action.expand : false,
          };
        }),
      };
    }

    case "ADD_TOOL": {
      return {
        ...state,
        tools: [...state.tools, action.payload],
      };
    }
    case "UPDATE_TOOL":
      return {
        ...state,
        tools: state.tools.map((tool) => {
          if (action.id === tool._id) {
            return {
              ...tool,
              name: action.payload.name,
              prize: action.payload.prize,
              organization: action.payload.organization,
            };
          } else {
            return {
              ...tool,
              name: tool.name,
              prize: tool.prize,
              organization: tool.organization,
            };
          }
        }),
      };
    case "DELETE_TOOL":
      return {
        ...state,
        tools: state.tools.filter((tool) => tool._id !== action.id),
      };
    case "UPDATE_ORG":
      return {
        ...state,
        tools: state.tools.map((tool) => {
          {
            return {
              ...tool,
              organization: tool.organization.map((org) => {
                if (org._id === action.id) {
                  return {
                    ...org,
                    name: action.payload.name,
                    user: action.payload.user,
                  };
                } else {
                  return {
                    ...org,
                    name: org.name,
                    user: org.user,
                  };
                }
              }),
            };
          }
        }),
      };
    case "DELETE_ORG":
      return {
        ...state,
        tools: state.tools.map((tool) => {
          return {
            ...tool,
            organization: tool.organization.filter(
              (el) => el._id !== action.id
            ),
          };
        }),
      };

    default:
      return state;
  }
};
