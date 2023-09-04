import { IUserData } from '../shared/types';
import {
  apiRoot,
  buildClientWithPasswordFlow,
  customerApiRoot,
} from './BuildClient';
import { BaseAddress } from '@commercetools/platform-sdk';

export const loginCustomer = (email: string, password: string) => {
  return customerApiRoot.login().post({ body: { email, password } }).execute();
};

export const changeUserName = (
  name: string,
  customerID: string,
  version: number
) => {
  return customerApiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'setFirstName',
            firstName: name,
          },
        ],
      },
    })
    .execute();
};

export const changeSurname = (
  name: string,
  customerID: string,
  version: number
) => {
  return customerApiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'setLastName',
            lastName: name,
          },
        ],
      },
    })
    .execute();
};

export const changeBirthday = (
  value: string,
  customerID: string,
  version: number
) => {
  return customerApiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'setDateOfBirth',
            dateOfBirth: value,
          },
        ],
      },
    })
    .execute();
};

export const changeEmail = (
  value: string,
  customerID: string,
  version: number
) => {
  return customerApiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'changeEmail',
            email: value,
          },
        ],
      },
    })
    .execute();
};

export const changePassword = (
  value: string,
  newValue: string,
  customerID: string,
  version: number
) => {
  return customerApiRoot
    .customers()
    .password()
    .post({
      body: {
        id: customerID,
        version: version,
        currentPassword: value,
        newPassword: newValue,
      },
    })
    .execute();
};

export const getDataUser = () => {
  return customerApiRoot.me().get().execute();
};

export const getProductList = (
  category: string = '',
  size: number | null = null
) => {
  let params = ``;
  if (category && size) {
    params = `masterData(current(categories(id="${category}") and variants(attributes(value = ${size}))))`;
  } else if (category) {
    params = `masterData(current(categories(id="${category}")))`;
  } else if (size) {
    params = `masterData(current(variants(attributes(value=${size}))))`;
  }

  return apiRoot
    .products()
    .get(
      params
        ? {
            queryArgs: {
              where: params,
              limit: 30,
            },
          }
        : { queryArgs: { limit: 30 } }
    )
    .execute();
};

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

export const updateAddress = (
  customerID: string,
  version: number,
  value: BaseAddress,
  addressId: string
) => {
  return customerApiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'changeAddress',
            addressId: addressId,
            address: value,
          },
        ],
      },
    })
    .execute();
};

export const addAddress = (
  customerID: string,
  version: number,
  value: BaseAddress
) => {
  return customerApiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'addAddress',
            address: value,
          },
        ],
      },
    })
    .execute();
};

export const deleteAddress = (
  customerID: string,
  version: number,
  addressId: string
) => {
  return customerApiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'removeAddress',
            addressId: addressId,
          },
        ],
      },
    })
    .execute();
};
