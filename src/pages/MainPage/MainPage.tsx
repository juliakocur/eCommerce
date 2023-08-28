import './MainPage.scss';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import search from '../../shared/assets/icons/search.svg';
import arrow from '../../shared/assets/icons/arrow.svg';
import { getCategories, getProductList } from '../../api/methods';
import { Product, Category } from '@commercetools/platform-sdk';

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
  const [listProduct, setListProduct] = useState<[] | Product[]>([]);
  const [filter, setFilter] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [allCategories, setAllCategories] = useState<Category[] | []>([]);
  const clickHandler = (cat: Category) => {
    setCategory(cat);
    setOpen(false);
  };

  const getListProductItems = async () => {
    await getProductList()
      .then(({ body }) => setListProduct(body.results))
      .catch(() => setListProduct([]));
  };

  const getListCategoriesItems = async () => {
    await getCategories()
      .then(({ body }) => setAllCategories(body.results))
      .catch(() => setAllCategories([]));
  };

  useEffect(() => {
    getListCategoriesItems();
    getListProductItems();
  }, []);

  return (
    <div className="mainPage">
      <div className="header">
        {!!allCategories.length && (
          <div
            className={`dropdown`}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className="dropBtn">
              {category ? category?.name.en : 'Categories'}
              <img
                src={arrow}
                alt=""
                className={`arrow ${open ? 'upArrow' : ''}`}
              />
            </div>
            {!!open && (
              <div className="dropdownContent">
                {allCategories.map((el) => (
                  <div
                    className={`dropLink`}
                    onClick={() => clickHandler(el)}
                    key={el.slug.en}
                  >
                    {el.name.en}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="searchForm">
          <input type="text" placeholder="Search..." className="searchInput" />
          <img src={search} alt="search" className="searchImg" />
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
        {!!listProduct.length &&
          listProduct.map((el) => <ProductCard info={el} key={el.id} />)}
      </div>
    </div>
  );
};
export default MainPage;
