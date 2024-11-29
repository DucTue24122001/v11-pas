import { configureStore } from "@reduxjs/toolkit"
import { clientSlice } from "./client-slice"
import { accountSlice } from "./account-slice"
import { reportSlice } from "./report-slice"

export const store = configureStore({
  reducer: {
    client: clientSlice.reducer,
    account: accountSlice.reducer,
    report: reportSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>