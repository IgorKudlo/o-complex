import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addProduct } from "../../features/counter/counterSlice"
import { Counter } from "../../features"
import type { Card as CardType } from "../../features/cards/cardsApiSlice"
import s from "./card.module.scss"

type CardProps = CardType

export const Card = ({
  id,
  image_url,
  title,
  description,
  price,
}: CardProps) => {
  const dispatch = useAppDispatch()
  const [isShowCounter, setIsShowCounter] = useState(false)

  const handleShowCounter = () => {
    setIsShowCounter(true)
    dispatch(addProduct({ id, title, price }))
  }

  return (
    <div className={s.card}>
      <div className={s.image}>
        <img src={image_url} alt={title} />
      </div>
      <div className={s.title}>{title}</div>
      <div className={s.description}>{description}</div>
      <div className={s.price}>цена: {price}&#8381;</div>
      {isShowCounter ? (
        <Counter id={id} />
      ) : (
        <button className={s.button} onClick={handleShowCounter}>
          купить
        </button>
      )}
    </div>
  )
}
