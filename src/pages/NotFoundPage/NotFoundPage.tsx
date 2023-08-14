import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <div className="bcgNotFound">
        <div className="textNotFound">
          <div className="gradientText gradientColor">
            <p>Ой, ошибка</p>
            <h1 className="errorNumb">404</h1>
          </div>
          <p>Мы не смогли найти эту страницу.</p>
          <p>
            Перейдите на
            <Link to="/main" className="linkNotFound gradientColor">
              <span> главную страницу</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
