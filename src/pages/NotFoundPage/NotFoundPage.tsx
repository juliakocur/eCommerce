import './NotFoundPage.scss';
import { Link } from 'react-router-dom';
import img from '../../shared/assets/image/bgNotFound.png';

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <div className="bcgNotFound">
        <img src={img} alt="aa" />
        <div className="textNotFound">
          <div className="gradientText">
            <p>Ой, ошибка</p>
            <h1 className="errorNumb">404</h1>
          </div>
          <p>Мы не смогли найти эту страницу.</p>
          <p>
            Перейдите на
            <Link to="/main" className="linkNotFound">
              <span> главную страницу</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
