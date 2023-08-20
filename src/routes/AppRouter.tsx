import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { memo } from 'react';
import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import CartPage from '../pages/CartPage/CartPage';
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import UserPage from '../pages/UserPage/UserPage';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import BasePage from '../pages/BasePage/BasePage';
import { useAppSelector } from '../store';

export const routes = {
  root: {
    path: '/',
    name: 'Root',
  },
  login: {
    path: 'login',
    name: 'Login page',
  },
  main: {
    path: 'main',
    name: 'Main page',
  },
  cart: {
    path: 'cart',
    name: 'Cart page',
  },
  product: {
    path: 'product',
    name: 'Product page',
  },
  id: {
    path: ':id',
    name: 'Product id',
  },
  about: {
    path: 'about-us',
    name: 'About us page',
  },
  notFound: {
    path: 'not-found',
    name: 'Not found page',
  },
  user: {
    path: 'user',
    name: 'User page',
  },
  registration: {
    path: 'registration',
    name: 'Registration page',
  },
};

interface IPropsProtectedRoute {
  children: JSX.Element;
}

const ProtectedUserRoute = ({ children }: IPropsProtectedRoute) => {
  const { userId } = useAppSelector((state) => state.auth);

  return userId ? children : <MainPage />;
};

const ProtectedAuthRoute = ({ children }: IPropsProtectedRoute) => {
  const { userId } = useAppSelector((state) => state.auth);

  return !userId ? children : <MainPage />;
};

const allRoutes: RouteObject = {
  path: routes.root.path,
  element: <BasePage />,
  children: [
    { index: true, element: <Navigate to={routes.main.path} replace /> },
    {
      path: routes.login.path,
      element: (
        <ProtectedAuthRoute>
          <LoginPage />
        </ProtectedAuthRoute>
      ),
    },
    { path: routes.main.path, element: <MainPage /> },
    { path: routes.cart.path, element: <CartPage /> },
    {
      path: `${routes.product.path}/${routes.id.path}`,
      element: <ProductDetailPage />,
    },
    { path: routes.about.path, element: <AboutUsPage /> },
    { path: routes.notFound.path, element: <NotFoundPage /> },
    {
      path: routes.user.path,
      element: (
        <ProtectedUserRoute>
          <UserPage />
        </ProtectedUserRoute>
      ),
    },
    {
      path: routes.registration.path,
      element: (
        <ProtectedAuthRoute>
          <RegistrationPage />
        </ProtectedAuthRoute>
      ),
    },
    { path: `*`, element: <NotFoundPage /> },
  ],
};

export const AppRouter = memo(() => {
  return useRoutes([allRoutes]);
});
