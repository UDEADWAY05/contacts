import { makeAutoObservable } from 'mobx';
import { ContactDto } from 'src/types/dto/ContactDto';

const initialState: ContactDto['id'][] = [
  "ecd667da-0513-4dd5-ba50-e7cc69f6573c",
  "84465d40-ef7b-41c7-8de4-29e7fb4ddd21",
  "0fc3c0ea-0e30-439b-bf2d-393e044788b2",
  "08b8735f-c1b6-4029-a96b-3d3e91869727",
  "9dd3369c-e35e-4cff-922c-a3dd16cc475a"
]

export const favoritesStore = makeAutoObservable({
  favorites: initialState,
  *add(favorite: ContactDto['id']) {
    favoritesStore.favorites.push(favorite)
  },
  *remove(favorite: ContactDto['id']) {
    favoritesStore.favorites = favoritesStore.favorites.filter(el => el !== favorite)
  },
})