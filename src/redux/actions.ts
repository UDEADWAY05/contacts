import { ContactDto } from './../types/dto/ContactDto';
import { RootState } from "./store"

export const CONTACT_GET_BY_ID_ACTION = "CONTACT_GET_BY_ID_ACTION"

interface GetContactDtoByIdAction {
    type: typeof CONTACT_GET_BY_ID_ACTION,
    payload: {
        id: ContactDto['id']
    }
}

export function increaseQuantityActionCreator(id: ContactDto['id']): GetContactDtoByIdAction {
    return { type: CONTACT_GET_BY_ID_ACTION, payload: { id } }
}

export type ProjectActions = GetContactDtoByIdAction