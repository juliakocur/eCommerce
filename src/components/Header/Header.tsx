import './Header.scss';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import HeaderNav from './HeaderNav/HeaderNav';
import HeaderSearch from './HeaderSearch/HeaderSearch';
import logoHeader from '../../routes/../shared/assets/icons/logoHeader.svg';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/AppRouter';

const Header = () => {
  return (
    <div className="wrapperHeader">
      <Link to={`../../${routes.main.path}`} className="headerLogo">
        <img src={logoHeader} alt="" />
      </Link>
      <HeaderNav />
      <HeaderSearch />
      <HeaderIcons />
    </div>
  );
};

export default Header;
