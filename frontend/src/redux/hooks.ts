import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { store } from "./store";

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector(selector);
