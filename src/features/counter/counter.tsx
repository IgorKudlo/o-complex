import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  decrement,
  increment,
  typeAmount,
  selectProducts,
} from "./counterSlice"
import s from "./counter.module.scss"

type CounterState = {
  id: number
}

export const Counter = ({ id }: CounterState) => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  let count = 1

  if (products) {
    count = products.find(product => product.id === id)?.count!
  }

  return (
    <div className={s.counter}>
      <button className={s.button} onClick={() => dispatch(decrement({ id }))}>
        -
      </button>
      <input
        className={s.textbox}
        value={count}
        type="number"
        onChange={e =>
          dispatch(typeAmount({ id, count: Number(e.target.value) }))
        }
      />
      <button className={s.button} onClick={() => dispatch(increment({ id }))}>
        +
      </button>
    </div>
  )
}
