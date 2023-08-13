import './HeaderNav.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import arrow from '../../../shared/assets/icons/arrow.svg';

const HeaderNav = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('Categories');

  const clickHandler = (cat: string) => {
    setCategory(cat);
    setOpen(false);
  };

  return (
    <div className="headerNav">
      <div
        className={`dropdown `}
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
      <Link to="/about-us" className="link">
        About us
      </Link>
      <Link to="/login" className="link">
        Login
      </Link>
      <Link to="/registration" className="link">
        Registration
      </Link>
    </div>
  );
};

export default HeaderNav;
