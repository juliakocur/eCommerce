import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import './HeaderNav.scss';

const HeaderNav = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);

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
