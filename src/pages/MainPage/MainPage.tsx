import './MainPage.scss';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCallback, useEffect, useState } from 'react';
import search from '../../shared/assets/icons/search.svg';
import arrow from '../../shared/assets/icons/arrow.svg';
import { getCategories, getProductList } from '../../api/methods';
import { Product, Category } from '@commercetools/platform-sdk';

const allSize = [38, 39, 40, 41, 42, 43];

const MainPage = () => {
  const [listProduct, setListProduct] = useState<[] | Product[]>([]);
  const [openCategories, setOpenCategories] = useState(false);
  const [openSizes, setOpenSizes] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [allCategories, setAllCategories] = useState<Category[] | []>([]);
  const [suggestions, setSuggestions] = useState<[] | Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const clickHandler = (cat: Category) => {
    setCategory(cat);
    setOpenCategories(false);
  };

  const getListProductItems = async () => {
    await getProductList(
      category ? category.id : undefined,
      size ? size : undefined
    )
      .then(({ body }) => {
        setListProduct(body.results);
      })
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

  useEffect(() => {
    if (category || size) {
      getListProductItems();
    }
  }, [category, size]);

  const searchHandler = useCallback(() => {
    if (searchValue && listProduct.length) {
      setSuggestions(
        listProduct.filter(
          (el: Product) =>
            el.masterData.current.name.en
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) !== -1
        )
      );
    } else if (listProduct.length) {
      setSuggestions(listProduct);
    } else {
      setSuggestions([]);
    }
  }, [searchValue, listProduct]);

  useEffect(() => {
    searchHandler();
  }, [searchValue, searchHandler]);

  return (
    <div className="mainPage">
      <div className="header">
        <div className="listFilters">
          {!!allCategories.length && (
            <div
              className={`dropdown`}
              onClick={() => {
                setOpenCategories(!openCategories);
              }}
            >
              <div className="dropBtn">
                {category ? category?.name.en : 'Categories'}
                <img
                  src={arrow}
                  alt=""
                  className={`arrow ${openCategories ? 'upArrow' : ''}`}
                />
              </div>
              {!!openCategories && (
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
          {!!allCategories.length && (
            <div
              className={`dropdown`}
              onClick={() => {
                setOpenSizes(!openSizes);
              }}
            >
              <div className="dropBtn">
                {size ? size : 'Size'}
                <img
                  src={arrow}
                  alt=""
                  className={`arrow ${openSizes ? 'upArrow' : ''}`}
                />
              </div>
              {!!openSizes && (
                <div className="dropdownContent">
                  {allSize.map((el) => (
                    <div
                      className={`dropLink`}
                      onClick={() => setSize(el)}
                      key={el}
                    >
                      {el}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="searchForm">
          <input
            type="text"
            placeholder="Search..."
            className="searchInput"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <img src={search} alt="search" className="searchImg" />
        </div>
      </div>
      <div className="wrapperCardsProducts">
        {!!suggestions.length &&
          suggestions.map((el) => <ProductCard info={el} key={el.id} />)}
      </div>
    </div>
  );
};
export default MainPage;
