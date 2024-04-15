import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

type Product = {
  id: number
  title: string
  count: number
  price: number
}

type CounterSliceState = {
  products: Product[]
}

const initialState: CounterSliceState = {
  products: [],
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: create => ({
    addProduct: create.reducer(
      (state, action: PayloadAction<Omit<Product, "count">>) => {
        state.products.push({ ...action.payload, count: 1 })
      },
    ),
    increment: create.reducer(
      (state, action: PayloadAction<{ id: number }>) => {
        state.products.forEach(product => {
          if (product.id === action.payload.id) product.count += 1
          return product
        })
      },
    ),
    decrement: create.reducer(
      (state, action: PayloadAction<{ id: number }>) => {
        state.products.forEach((product, index) => {
          if (product.id === action.payload.id) {
            if (product.count > 1) product.count -= 1
          }
        })
      },
    ),
    typeAmount: create.reducer(
      (state, action: PayloadAction<{ id: number; count: number }>) => {
        state.products.forEach(product => {
          if (product.id === action.payload.id)
            product.count = action.payload.count
          return product
        })
      },
    ),
  }),
  selectors: {
    selectProducts: counter => counter.products,
  },
})

export const { addProduct, decrement, increment, typeAmount } =
  counterSlice.actions

export const { selectProducts } = counterSlice.selectors
