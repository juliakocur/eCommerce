import './BasePage.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { useEffect } from 'react';
import { buildClientWithTokenFlow } from '../../api/BuildClient';

const BasePage = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const { isCustomer } = useAppSelector((state) => state.customer);

  useEffect(() => {
    if (userId && !isCustomer) {
      buildClientWithTokenFlow();
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default BasePage;
