import { createStore, applyMiddleware, AnyAction, Store } from 'redux';
import { createWrapper, Context, MakeStore } from 'next-redux-wrapper';
import { reducer, RootState } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk'

const makeStore: MakeStore<Store<RootState>> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

// export an assembled wrapper

export const wrapper = createWrapper<Store<RootState>>(makeStore);

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

