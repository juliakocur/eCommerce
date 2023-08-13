import './HeaderIcons.scss';
import basket from '../../../shared/assets/icons/basket.svg';
import user from '../../../shared/assets/icons/user.svg';
import { Link } from 'react-router-dom';

const HeaderIcons = () => {
  return (
    <div className="wrapperIcons">
      <Link to="/user" className="userAccount">
        <img src={user} alt="search" className="userImg" />
        Account
      </Link>
      <Link to="/cart" className="userBasket">
        <img src={basket} alt="search" className="basketImg" />
        Basket
      </Link>
    </div>
  );
};

export default HeaderIcons;
