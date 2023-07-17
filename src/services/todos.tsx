import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAllTodos: builder.query<any, void>({
      query: () => ({
        url: "todos",
        method: "GET",
      }),
      providesTags: ["Todos"],
    }),
    getTodoById: builder.query<any, void>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "GET",
      }),
      providesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<any, void>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<any, any>({
      query: (updatedData) => {
        const { id, ...data } = updatedData;
        console.log(data);

        return {
          url: `todos/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    createTodo: builder.mutation<any, any>({
      query: (body) => ({
        url: `todos/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useDeleteTodoMutation,
  useCreateTodoMutation,
  useLazyGetTodoByIdQuery,
  useUpdateTodoMutation,
} = todosApi;
