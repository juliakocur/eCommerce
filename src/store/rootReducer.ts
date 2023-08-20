import { PayloadAction, combineReducers, createSlice } from '@reduxjs/toolkit';
import { type TokenStore } from '@commercetools/sdk-client-v2';

interface ICustomerState {
  isCustomer: boolean;
}

const CustomerInitState: ICustomerState = {
  isCustomer: false,
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState: CustomerInitState,
  reducers: {
    changeCustomerState: (state, { payload }: PayloadAction<boolean>) => {
      state.isCustomer = payload;
    },
  },
});

export const { changeCustomerState } = customerSlice.actions;
const { reducer: customerReducer } = customerSlice;

interface IUserAuth {
  tokenCache: TokenStore;
}

const UserInitState: IUserAuth = {
  tokenCache: {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  },
};

export const userAuthSlice = createSlice({
  name: 'auth',
  initialState: UserInitState,
  reducers: {
    changeTokenCache: (state, { payload }: PayloadAction<TokenStore>) => {
      state.tokenCache = payload;
    },
    resetTokenCache: (state) => {
      state.tokenCache = {
        token: '',
        expirationTime: 0,
        refreshToken: '',
      };
    },
  },
});

export const { changeTokenCache, resetTokenCache } = userAuthSlice.actions;
const { reducer: userAuthReducer } = userAuthSlice;

export const rootReducer = combineReducers({
  auth: userAuthReducer,
  customer: customerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
