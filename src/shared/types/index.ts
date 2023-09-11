export interface IAddress {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password?: string;
  addresses?: IAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  anonymousCartId: string;
}

export interface IDeveloper {
  name: string;
  text: string;
  image: string;
  git: string;
}

export interface IDeveloperProps {
  developer: IDeveloper;
}
