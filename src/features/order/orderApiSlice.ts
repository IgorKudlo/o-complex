import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type OrderApiResponse = {
  success: 0 | 1
  error?: string
}

type OrderItem = {
  id: number
  quantity: number
}

type OrderApiArg = {
  phone: string
  cart: OrderItem[]
}

export const orderApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: " http://o-complex.com:1337" }),
  reducerPath: "orderApi",
  endpoints: build => ({
    sendOrder: build.mutation<OrderApiResponse, OrderApiArg>({
      query: ({ ...patch }) => ({
        url: "/order",
        method: "POST",
        body: patch,
      }),
    }),
  }),
})

export const { useSendOrderMutation } = orderApiSlice
