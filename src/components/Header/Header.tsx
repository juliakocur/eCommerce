import './Header.scss';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderNav from './HeaderNav/HeaderNav';

const Header = () => {
    return (
        <div className="wrapperHeader">
            <HeaderLogo />
            <HeaderNav />
            <div className="headerSearch"></div>
        </div>
    );
};

export default Header;
