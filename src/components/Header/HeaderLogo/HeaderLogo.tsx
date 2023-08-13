import './HeaderLogo.scss';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Link to="/main" className="headerLogo">
      SNEAKER<span className="slash">/</span>BAR
    </Link>
  );
};

export default HeaderLogo;
