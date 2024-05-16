import { makeAutoObservable } from 'mobx';
import { api } from 'src/api';
import { ContactDto } from 'src/types/dto/ContactDto';
import { isSuccessResponse, Response } from 'src/types/response';

export const contactsStore = makeAutoObservable({
  contacts: [] as ContactDto[],
  *get() {
    const result: Response = yield api.getContacts();
    
    console.log('####result: ', result)
    if (isSuccessResponse(result)) {
      contactsStore.contacts = result.data;
    }
    return result;
  }
})