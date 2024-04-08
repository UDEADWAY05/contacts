import { DATA_CONTACT } from "src/__data__";
import { FavoriteContactsDto } from "src/types/dto/FavoriteContactsDto";

export function favoriteContactsReducer(
    state: FavoriteContactsDto = [
        DATA_CONTACT[0].id,
        DATA_CONTACT[1].id,
        DATA_CONTACT[2].id,
        DATA_CONTACT[3].id
    ]
) {
    return state
}