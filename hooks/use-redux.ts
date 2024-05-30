import type { AppDispatch, RootState } from '@shared/providers/redux/index';
import { useDispatch, useSelector } from 'react-redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';

import type { TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState & PersistPartial> = useSelector;