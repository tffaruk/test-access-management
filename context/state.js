import assetsState from "@/state/assetState/assetState";
import filterAssets from "@/state/assetState/filterAsset";
import coursesState from "@/state/courseState/courseState";
import filterCourses from "@/state/courseState/filterCourses";
import toastReducer from "@/state/toastReducer";
import filterOrganization from "@/state/toolsState/filterOrganization";
import toolsState from "@/state/toolsState/toolsState";
import filterUser from "@/state/userState/filterUser";
import { createContext, useContext } from "react";
import userStates from "state/userState/userState";

const AppContext = createContext();
export const AppWrapper = ({ children }) => {
  const { userState, userDispatch } = userStates();
  const { toolState, toolDispatch } = toolsState();
  const { courseState, courseDispatch } = coursesState();
  const { assetState, assetDispatch } = assetsState();
  const { filterUserState, filterDisPatch } = filterUser(userState.users);
  const { filterOrganizationState, filterOrganizationDisPatch } =
    filterOrganization(toolState.tools);
  const { filterCoursesState, filterCoursesDisPatch } = filterCourses(
    courseState.courses
  );
  const { filterAssetsDisPatch, filterAssetsState } = filterAssets();
  const { toastDispatch, toastState } = toastReducer();
  let state = {
    // users
    userState,
    userDispatch,
    // for single user
    filterUserState,
    filterDisPatch,
    // tools
    toolState,
    toolDispatch,
    // for single organization
    filterOrganizationState,
    filterOrganizationDisPatch,

    // course
    courseState,
    courseDispatch,
    // for single course
    filterCoursesState,
    filterCoursesDisPatch,
    // assets
    assetState,
    assetDispatch,
    // filter asset
    filterAssetsDisPatch,
    filterAssetsState,
    // toast
    toastDispatch,
    toastState,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
