import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../store/reducers';

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useTypedDispatch = () => useDispatch<TypedDispatch<RootState>>();
