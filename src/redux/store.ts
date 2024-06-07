import { contactsMiddleware, contactsReducer, contactsReducerPath }  from "./contacts"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { groupsMiddleware, groupsReducer, groupsReducerPath } from "./group"
import { favouritesReducer } from "./favourites"

const rootReducer = combineReducers({
  [contactsReducerPath]: contactsReducer,
  [groupsReducerPath]: groupsReducer,
  favourites: favouritesReducer
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([
      contactsMiddleware,
      groupsMiddleware
    ])
  },
})

export type RootState = ReturnType<typeof rootReducer>