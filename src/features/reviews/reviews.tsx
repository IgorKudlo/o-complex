import { useGetReviewsQuery } from "./reviewsApiSlice"
import s from "./reviews.module.scss"

export const Reviews = () => {
  const { data, isLoading, isError, isSuccess } = useGetReviewsQuery()

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isSuccess) {
    return (
      <div className={s.reviews}>
        {/* review.id is the same, so I used index */}
        {data.map((review, index) => (
          <div
            className={s.review}
            key={index}
            dangerouslySetInnerHTML={{ __html: review.text }}
          />
        ))}
      </div>
    )
  }
}
