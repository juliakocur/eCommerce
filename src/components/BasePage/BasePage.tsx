import './BasePage.scss';
import { AppRouter } from '../../routes/AppRouter';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const BasePage = () => {
  return (
    <>
      <header className="header">
        <Header />
      </header>

      <main className="main">
        <AppRouter />
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default BasePage;
