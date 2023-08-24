import './MainPage.scss';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useState } from 'react';
import { productList } from '../../shared/mock';
import search from '../../shared/assets/icons/search.svg';
import arrow from '../../shared/assets/icons/arrow.svg';

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
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('Categories');
  const clickHandler = (cat: string) => {
    setCategory(cat);
    setOpen(false);
  };

  return (
    <div className="mainPage">
      <div className="header">
        <div className="searchForm">
          <input type="text" placeholder="Search..." className="searchInput" />
          <img src={search} alt="search" className="searchImg" />
        </div>
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
              <div className={`dropLink`} onClick={() => clickHandler('ALL')}>
                ALL
              </div>
            </div>
          )}
        </div>
      </div>
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
