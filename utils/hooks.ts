import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const filtered = ({ obj, predicate }: { obj: object; predicate: (_obj: PropertyKey) => boolean; }): {} => {

  let result = {}, key: PropertyKey;

  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !predicate(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;

};
