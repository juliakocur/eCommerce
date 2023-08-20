import './HeaderNav.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import arrow from '../../../shared/assets/icons/arrow.svg';
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
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [category, setCategory] = useState('Categories');

  const clickHandler = (cat: string) => {
    setCategory(cat);
    setOpen(false);
  };

  const logout = () => {
    dispatch(changeUserId(''));
    dispatch(changeCustomerState(false));
    dispatch(resetTokenCache());
    navigate(`../../${routes.main.path}`);
  };

  return (
    <>
      <div className={`headerNav ${openMenu ? 'menuOpen' : ''}`}>
        <div
          className={`dropdown`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="dropBtn">
            {category}
            <img
              src={arrow}
              alt=""
              className={`arrow ${open ? 'upArrow' : ''}`}
            />
          </div>
          {!!open && (
            <div className="dropdownContent">
              <div className={`dropLink`} onClick={() => clickHandler('Men')}>
                Men
              </div>
              <div className={`dropLink`} onClick={() => clickHandler('Women')}>
                Women
              </div>
              <div
                className={`dropLink`}
                onClick={() => clickHandler('Categories')}
              >
                Categories
              </div>
            </div>
          )}
        </div>
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
