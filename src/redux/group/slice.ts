import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

//тут я решил чуть-чуть улучшить задание и решил просоединить через API

export const groupsSlice = createApi({
  reducerPath: "groups",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mocki.io/v1"
  }),
  endpoints: (builded) => ({
    getGroups: builded.query<GroupContactsDto[], void>({
      query: () => {
        return {
          url: "/efc514be-d583-4def-8d5d-2d3bd413f5da"
        }
      }      
    })
  })
})
