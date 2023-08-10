import './Header.scss';
import HeaderLogo from './HeaderLogo/HeaderLogo';

const Header = () => {
    return (
        <div className="wrapperHeader">
            <HeaderLogo />
            <div className="headerNav"></div>
            <div className="headerSearch"></div>
        </div>
    );
};

export default Header;
