import { useReducer } from "react";
import toolStates from "./toolsState";

const filterOrganization = () => {
  const {
    toolState: { tools },
  } = toolStates();
  const filterReducer = (state, action) => {
    switch (action.type) {
      case "SINGLE_TOOL":
        return {
          ...state,
          tools: tools.filter((tool) => tool._id === action.id),
        };
      case "SINGLE_ORGANIZATION":
        return {
          ...state,
          organization: tools
            .filter((tool) => tool._id === action.toolId)[0]
            .organization.filter((org) => org._id === action.orgId),
        };

      default:
        return state;
    }
  };
  const initialState = {
    tools: [],
    organization: [],
  };
  const [filterOrganizationState, filterOrganizationDisPatch] = useReducer(
    filterReducer,
    initialState
  );

  return { filterOrganizationDisPatch, filterOrganizationState };
};

export default filterOrganization;
