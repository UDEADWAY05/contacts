
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactDto } from "src/types/dto/ContactDto";

//тут я решил чуть-чуть улучшить задание и решил просоединить через API

export const contactsSlice = createApi({
  reducerPath: "contacts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mocki.io/v1"
  }),
  endpoints: (builded) => ({
    getContact: builded.query<ContactDto[], void>({
      query: () => {
        return {
          url: "/b06b4e3d-cb29-4e0e-84b8-c257169548d6"
        }
      }      
    })
  })
})
