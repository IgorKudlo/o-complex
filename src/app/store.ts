import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { counterSlice } from "../features/counter/counterSlice"
import { reviewsApiSlice } from "../features/reviews/reviewsApiSlice"
import { cardsApiSlice } from "../features/cards/cardsApiSlice"
import { orderApiSlice } from "../features/order/orderApiSlice"

const rootReducer = combineSlices(
  counterSlice,
  orderApiSlice,
  reviewsApiSlice,
  cardsApiSlice,
)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
        .concat(reviewsApiSlice.middleware)
        .concat(cardsApiSlice.middleware)
        .concat(orderApiSlice.middleware)
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
