import './HeaderNav.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  changeCustomerState,
  changeUserId,
  resetTokenCache,
} from '../../../store/rootReducer';
import { routes } from '../../../routes/AppRouter';

const HeaderNav = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const logout = () => {
    dispatch(changeUserId(''));
    dispatch(changeCustomerState(false));
    dispatch(resetTokenCache());
    navigate(`../../${routes.main.path}`);
  };

  return (
    <>
      <div className={`headerNav ${openMenu ? 'menuOpen' : ''}`}>
        <NavLink to="/about-us" className="link">
          About us
        </NavLink>
        {!userId && (
          <>
            <NavLink to="/login" className="link">
              Login
            </NavLink>
            <NavLink to="/registration" className="link">
              Registration
            </NavLink>
          </>
        )}
        {userId && (
          <div className="link" onClick={logout}>
            Logout
          </div>
        )}
      </div>
      <button
        className={`burgerBtn ${openMenu ? 'upBurger' : ''}`}
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      ></button>
    </>
  );
};

export default HeaderNav;
