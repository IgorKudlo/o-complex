import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type Card = {
  id: number
  image_url: string
  title: string
  description: string
  price: number
}

type CardsApiResponse = {
  page: number
  amount: number
  total: number
  products: Card[]
}

type CardsApiArg = {
  countCards: number
}

export const cardsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://o-complex.com:1337" }),
  reducerPath: "cardsApi",
  tagTypes: ["Cards"],
  endpoints: build => ({
    getCards: build.query<CardsApiResponse, CardsApiArg>({
      query: ({ countCards }) => `/products?page=1&page_size=${countCards}`,
      providesTags: (result, error, args) => [{ type: "Cards", args }],
    }),
  }),
})

export const { useGetCardsQuery } = cardsApiSlice
