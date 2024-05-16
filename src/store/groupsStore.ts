import { makeAutoObservable } from 'mobx';
import { api } from 'src/api';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { isSuccessResponse, Response } from 'src/types/response';

export const groupsStore = makeAutoObservable({
  groups: [] as GroupContactsDto[],
  *get() {
    const result: Response = yield api.getGroups();
    
    if (isSuccessResponse(result)) {
      groupsStore.groups = result.data;
    };
    return result;
  }
});