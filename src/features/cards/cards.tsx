import { useEffect, useState } from "react"
import { Card } from "../../components"
import { useGetCardsQuery } from "./cardsApiSlice"
import s from "./cards.module.scss"

export const Cards = () => {
  const [countCards, setCountCards] = useState(6)
  const { data, isLoading, isError, isSuccess, isFetching } = useGetCardsQuery({
    countCards,
  })

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight) {
      if (data && data.amount >= countCards) {
        setCountCards(prevCountCards => prevCountCards + 6)
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [data, countCards])

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
      <div className={s.cards}>
        {data.products.map(card => (
          <Card key={card.id} {...card} />
        ))}
        {isFetching && <h1>Loading...</h1>}
      </div>
    )
  }
}
