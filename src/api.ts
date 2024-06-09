import { ContactDto } from "./types/dto/ContactDto";
import { GroupContactsDto } from "./types/dto/GroupContactsDto";
import { Response } from "./types/response";

class Api {
  async getGroups(): Promise<Response<GroupContactsDto[]>> {
    const response = await fetch(
      'https://mocki.io/v1/17eac248-1522-4ce0-8973-75ee997f541d'
    ).then(
      res => res.json()
    );
    console.log(response)
    return response;
  };
  async getContacts(): Promise<Response<ContactDto[]>> {
    const response = await fetch(
      'https://mocki.io/v1/50717dbe-e537-46a2-8a08-45375ddb53f0'
    ).then(
      res => res.json()
    );
    console.log(response)
    return response;
  }
};

export const api = new Api();