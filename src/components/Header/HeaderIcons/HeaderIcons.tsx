import './HeaderIcons.scss';
import basket from '../../../shared/assets/icons/basket.svg';
import user from '../../../shared/assets/icons/user.svg';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store';

const HeaderIcons = () => {
  const { userId } = useAppSelector((state) => state.auth);

  return (
    <div className="wrapperIcons">
      {userId && (
        <Link to="/user" className="userAccount">
          <img src={user} alt="search" className="userImg" />
          Account
        </Link>
      )}
      <Link to="/cart" className="userBasket">
        <img src={basket} alt="search" className="basketImg" />
        Cart
      </Link>
    </div>
  );
};

export default HeaderIcons;
