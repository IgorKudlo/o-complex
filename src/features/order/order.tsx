import { useState } from "react"
import type { FormEvent } from "react"
import { InputMask } from "@react-input/mask"
import { useAppSelector } from "../../app/hooks"
import { selectProducts } from "../counter/counterSlice"
import { useSendOrderMutation } from "./orderApiSlice"
import s from "./order.module.scss"

export const Order = () => {
  const products = useAppSelector(selectProducts)
  const [phone, setPhone] = useState("")
  const [isPhoneError, setIsPhoneError] = useState(false)

  const [sendOrder, { isLoading, data }] = useSendOrderMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const clearPhone = formatPhone(phone)

    if (clearPhone.length <= 10) {
      setIsPhoneError(true)
      return
    }

    try {
      setIsPhoneError(false)

      const cart = products.map(product => ({
        id: product.id,
        quantity: product.count,
      }))

      // @ts-ignore
      const { data } = await sendOrder({
        phone: clearPhone,
        cart,
      })

      if (data && data.success === 1) {
        // Заказ успешно отправлен
        alert("Заказ успешно отправлен")
      } else {
        // Обработка ошибки отправки заказа
        alert(data?.error)
      }
    } catch (error) {
      // Обработка ошибки отправки запроса
      console.error(error)
    }
  }

  const formatPhone = (phone: string) => {
    return phone.replace(/\D/g, "")
  }

  return (
    <form className={s.calculator} onSubmit={handleSubmit}>
      <div className={s.header}>Добавленные товары</div>
      <ul className={s.list}>
        {products.map(product => (
          <li className={s.item} key={product.id}>
            <span className={s.name}>{product.title}</span>
            <span className={s.count}>x{product.count}</span>
            <span className={s.price}>{product.price * product.count}₽</span>
          </li>
        ))}
      </ul>
      <div className={s.action}>
        <InputMask
          className={`${s.phone} ${isPhoneError ? s.phoneError : ""}`}
          mask="+7 (___) ___-__-__"
          showMask
          replacement={{ _: /\d/ }}
          onChange={e => setPhone(e.target.value)}
        />
        <button className={s.button} type="submit">
          заказать
        </button>
      </div>
    </form>
  )
}
