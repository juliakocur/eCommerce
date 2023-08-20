import './HeaderNav.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import arrow from '../../../shared/assets/icons/arrow.svg';

const HeaderNav = () => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [category, setCategory] = useState('Categories');

  const clickHandler = (cat: string) => {
    setCategory(cat);
    setOpen(false);
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
        <NavLink to="/login" className="link">
          Login
        </NavLink>
        <NavLink to="/registration" className="link">
          Registration
        </NavLink>
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
