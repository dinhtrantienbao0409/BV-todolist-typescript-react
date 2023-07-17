import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// interface Todo {
//   id: string;
//   name: string;
//   status: string;
// }

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAllTodos: builder.query<any, void>({
      query: () => {
        return {
          url: "todos",
          method: "GET",
        };
      },
      providesTags: ["Todos"],
    }),
    getTodoById: builder.query<any, void>({
      query: (id) => {
        return { url: `todos/${id}`, method: "GET" };
      },
      providesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<any, void>({
      query: (id) => {
        return { url: `todos/${id}`, method: "DELETE" };
      },
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<any, any>({
      query: ({ id, body }) => {
        return { url: `todos/${id}`, method: "PUT", body };
      },
    }),
    createTodo: builder.mutation<any, any>({
      query: (body) => {
        return { url: `todos/`, method: "POST", body };
      },
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
