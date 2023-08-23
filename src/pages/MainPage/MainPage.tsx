import './MainPage.scss';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useState } from 'react';
import { productList } from '../../shared/mock';

interface IFilter {
  name: string;
  id: number;
}

const filters: IFilter[] = [
  { name: 'filter 1', id: 1 },
  { name: 'filter 2', id: 2 },
  { name: 'filter 3', id: 3 },
  { name: 'filter 4', id: 4 },
];

const MainPage = () => {
  const [filter, setFilter] = useState<number | null>(null);
  console.log(filter);

  return (
    <div className="mainPage">
      <div className="wrapperFilter">
        {filters.map((el) => (
          <div
            className={`innerFilter ${el.id === filter ? 'active' : ''}`}
            key={`filter-${el.id}`}
            onClick={() => setFilter(el.id)}
          >
            {el.name}
          </div>
        ))}
      </div>
      <div className="wrapperCardsProducts">
        {productList.map((el) => (
          <ProductCard info={el} key={el.name} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
