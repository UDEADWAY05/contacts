import { createStore, combineReducers } from "redux"
import { contactsReducer } from "./contactsReducer"
import { groupContactsReducer } from "./groupContactsReducer"
import { favoriteContactsReducer } from "./favoriteContactsReducer"

const rootReducer = combineReducers({
    contacts: contactsReducer,
    groupContacts: groupContactsReducer,
    favoriteContacts: favoriteContactsReducer
})

export const store = createStore(
    rootReducer
)

export type RootState = ReturnType<typeof rootReducer>