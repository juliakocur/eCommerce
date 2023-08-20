import './Footer.scss';
import { Link } from 'react-router-dom';
import logo from '../../shared/assets/icons/logoFooter.svg';
import { routes } from '../../routes/AppRouter';

const Footer = () => {
  return (
    <div className="wrapperBg">
      <div className="wrapperFooter">
        <Link to={`../../${routes.main.path}`}>
          <img src={logo} alt="" />
        </Link>
        <div className="wrapperAddress">
          <div className="addressText">
            1612 Tod Lakes Suite 781 New Heidiport, <div>NE 24589</div>
          </div>
        </div>
        <div className="footerContacts">
          <div className="tel">
            <span>Phone</span>
            <Link to="tel:79001111111" className="linkStyle">
              +1 (23) 456 78 90
            </Link>
          </div>
          <div className="mail">
            <span>Email</span>
            <Link to="mailto:nfo@example.com" className="linkStyle">
              magandzinshop@myshop.by
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
