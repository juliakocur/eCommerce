import { Link } from 'react-router-dom';
import logoHeader from '../../routes/../shared/assets/icons/logoHeader.svg';
import { routes } from '../../routes/AppRouter';
import './Header.scss';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import HeaderNav from './HeaderNav/HeaderNav';
import HeaderSearch from './HeaderSearch/HeaderSearch';

const Header = () => {
  return (
    <div className="wrapperBorder">
      <div className="wrapperHeader">
        <Link to={`../../${routes.main.path}`} className="headerLogo">
          <img src={logoHeader} alt="" />
        </Link>
        <HeaderNav />
        <HeaderSearch />
        <HeaderIcons />
      </div>
    </div>
  );
};

export default Header;
