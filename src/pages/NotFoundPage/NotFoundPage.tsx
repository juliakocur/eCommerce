import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <div className="bcgNotFound">
        <div className="textNotFound">
          <div className="gradientText gradientColor">
            <p>Oops, error</p>
            <h1 className="errorNumb">404</h1>
          </div>
          <p>We couldn't find this page.</p>
          <p>
            Go to the
            <Link to="/main" className="linkNotFound gradientColor">
              <span> main page</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
