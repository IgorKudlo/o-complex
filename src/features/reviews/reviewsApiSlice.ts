import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import DOMPurify from "dompurify"

type Review = {
  id: string
  text: string
}

type ReviewsApiResponse = Review[]

export const reviewsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://o-complex.com:1337" }),
  reducerPath: "reviewsApi",
  endpoints: build => ({
    getReviews: build.query<ReviewsApiResponse, void>({
      query: () => "/reviews",
      transformResponse: (response: ReviewsApiResponse) =>
        response.map(review => ({
          id: review.id,
          text: DOMPurify.sanitize(review.text),
        })),
    }),
  }),
})

export const { useGetReviewsQuery } = reviewsApiSlice
