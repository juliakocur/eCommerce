import { IUserData } from '../shared/types';
import {
  apiRoot,
  buildClientWithPasswordFlow,
  customerApiRoot,
} from './BuildClient';

export const loginCustomer = (email: string, password: string) => {
  return customerApiRoot.login().post({ body: { email, password } }).execute();
};

export const getDataUser = () => {
  return customerApiRoot.me().get().execute();
};

export const getProductList = () => apiRoot.products().get().execute();

export const createUser = async (user: IUserData) => {
  await apiRoot
    .customers()
    .post({
      body: user,
    })
    .execute();

  buildClientWithPasswordFlow(user.email, user.password);

  return loginCustomer(user.email, user.password);
};

export const getCategories = () => apiRoot.categories().get().execute();

export const getProductById = (id: string) =>
  apiRoot.products().withId({ ID: id }).get().execute();
