import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAddProduct, IEditProduct, IProduct, IQuery } from "./types";

export const crudAPI = createApi({
  reducerPath: "crudAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/products/" }),
  tagTypes: ["CRUD"],
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], IQuery>({
      query: ({ limit = "" }) => `limit=${limit}`,
      providesTags: ["CRUD"],
    }),

    addProduct: builder.mutation<IProduct, IAddProduct>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CRUD"],
    }),

    getOneProduct: builder.query<IProduct, { id: string }>({
      query: ({ id = "" }) => `/${id}`,
      providesTags: ["CRUD"],
    }),

    editProduct: builder.mutation<IProduct, IEditProduct>({
      query: ({ editedProduct, id }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: editedProduct,
      }),
      invalidatesTags: ["CRUD"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CRUD"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetOneProductQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} = crudAPI;
