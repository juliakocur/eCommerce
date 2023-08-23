import './MainPage.scss';
import ProductCard from '../../components/ProductCard/ProductCard';

const MainPage = () => {
  console.log(process.env.REACT_APP_PROJECT_KEY);
  return (
    <div className="mainPage">
      <div className="wrapperFilter">
        <div className="innerFilter active">filter 1</div>
        <div className="innerFilter">filter 2</div>
        <div className="innerFilter">filter 3</div>
        <div className="innerFilter">filter 4</div>
      </div>
      <div className="wrapperCardsProducts">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default MainPage;
