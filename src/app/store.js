import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import testimonySlice from "../features/Testimony/testimonySlice"

import authSlice from "./reducers/auth"
import appSlice from "./reducers/app";


const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  testimony: testimonySlice,

  auth: authSlice,
  app: appSlice
};

export default configureStore({
  reducer: combinedReducer,
});
