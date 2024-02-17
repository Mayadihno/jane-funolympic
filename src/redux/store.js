import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";

// const serializeDate = (key, value) => {
//   if (value instanceof Date) {
//     return value.toISOString(); // Convert Date to string
//   }
//   return value;
// };
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Define custom serializableCheck options
// ignoredPaths: ["user.userData.timestamp", "user.phoneUser.timestamp"],
// ignoredActionPaths: ["payload.timestamp"],
// // Custom function to serialize non-serializable values
// serialize: serializeDate,
