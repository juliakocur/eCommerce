import './Header.scss';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderNav from './HeaderNav/HeaderNav';
import HeaderSearch from './HeaderSearch/HeaderSearch';

const Header = () => {
    return (
        <div className="wrapperHeader">
            <HeaderLogo />
            <HeaderNav />
            <HeaderSearch />
        </div>
    );
};

export default Header;
