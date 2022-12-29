import Axios from "@/lib/axios";
import { useEffect, useReducer } from "react";
import { toolReducer } from "./toolReducer";

const toolsState = () => {
  const initialState = {
    loading: false,
    tools: [],
    error: false,
  };
  const [toolState, toolDispatch] = useReducer(toolReducer, initialState);
  useEffect(() => {
    toolDispatch({
      type: "FETCHING_START",
    });
    Axios.get("tool")
      .then((data) =>
        toolDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.tools.map((tool) => {
            return { ...tool, expand: false };
          }),
        })
      )
      .catch(() => toolDispatch({ type: "FETCHING_FAILED" }));
  }, []);
  return {
    toolState: toolState,
    toolDispatch: toolDispatch,
  };
};

export default toolsState;
