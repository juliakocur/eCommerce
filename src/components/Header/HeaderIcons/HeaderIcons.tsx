import './HeaderIcons.scss';
import basket from '../../../shared/assets/icons/basket.svg';
import user from '../../../shared/assets/icons/user.svg';

const HeaderIcons = () => {
    return <>
        <div className="userAccount">
            <img src={user} alt="search" className="userImg" />
        </div>
        <div className="userBasket">
            <img src={basket} alt="search" className="basketImg" />
        </div>
    </>
}

export default HeaderIcons;