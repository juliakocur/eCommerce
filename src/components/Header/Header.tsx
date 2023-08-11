import './Header.scss';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderNav from './HeaderNav/HeaderNav';
import HeaderSearch from './HeaderSearch/HeaderSearch';

const Header = () => {
    return (
        <div className="wrapperHeader">
            <HeaderLogo />
            <HeaderNav />
            <HeaderSearch />
            <HeaderIcons />
        </div>
    );
};

export default Header;
