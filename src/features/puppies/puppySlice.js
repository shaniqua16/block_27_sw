
import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

 const puppyApi = api.injectEndpoints({
  
  endpoints: (builder) => ({
    getPuppy: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/players/${id}`,
      }),
    }),
    ProviderTags: ["Puppy"],

    getPuppies: builder.query({
      query: () =>({
        url: "/players",
        method: "GET",
      }), 
      ProviderTags: ["Puppy"],   
    }),
   

    deletePuppy: builder.mutation({
      query: (id) => ({
        url: `/players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
    }),

    addPuppy: builder.mutation({
      query: ({name, breed, status}) => ({
        url: `/players`,
        method: "POST",
        body: {name, breed, status},
      }),
      invalidatesTags: ["Puppy"],
    }),
    
  }),
});

const storeToken = (state, { payload }) => {
  localStorage.setItem("token", payload.token);
};

const puppySlice = createSlice({
  name: "puppy",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    
     if( api.endpoints?.AddPuppy?.matchFulfilled) builder.addMatcher(api.endpoints.puppies.matchFulfilled, storeToken);
  },
});

export default puppySlice.reducer;

export const { useGetPuppyQuery,useGetPuppiesQuery ,useDeletePuppyMutation, useAddPuppyMutation } = puppyApi;


