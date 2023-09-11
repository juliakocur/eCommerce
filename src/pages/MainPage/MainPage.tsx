import { Category, LineItem, Product } from '@commercetools/platform-sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCartById, getCategories, getProductList } from '../../api/methods';
import ProductCard from '../../components/ProductCard/ProductCard';
import arrow from '../../shared/assets/icons/arrow.svg';
import search from '../../shared/assets/icons/search.svg';
import { useAppSelector } from '../../store';
import './MainPage.scss';

const allSize = [38, 39, 40, 41, 42, 43];

export interface IDataCart {
  version: number;
  items: LineItem[];
}

const MainPage = () => {
  const [activePage, setActivePage] = useState(1);
  const { cartId } = useAppSelector((state) => state.auth);
  const [listProduct, setListProduct] = useState<[] | Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [openCategories, setOpenCategories] = useState(false);
  const [openSizes, setOpenSizes] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [allCategories, setAllCategories] = useState<Category[] | []>([]);
  const [suggestions, setSuggestions] = useState<[] | Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const clickHandler = (cat: Category) => {
    setActivePage(1);
    setCategory(cat);
    setOpenCategories(false);
  };
  const [refresh, setRefresh] = useState(false);
  const [dataCart, setDataCart] = useState<null | IDataCart>(null);

  useEffect(() => {
    if (cartId || refresh) {
      getCartById(cartId).then((res) => {
        if (res.body.lineItems?.length) {
          setDataCart({
            version: res.body.version,
            items: res.body.lineItems,
          });
        }
      });
      setRefresh(false);
    }
  }, [cartId, refresh]);

  const getListProductItems = async () => {
    await getProductList(
      activePage ? (activePage - 1) * 8 : 8,
      category ? category.id : undefined,
      size ? size : undefined
    )
      .then(({ body }) => {
        setTotal(body.total);
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
    if (category || size || activePage) {
      getListProductItems();
    }
  }, [category, size, activePage]);

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

  const allPages = useMemo(() => {
    if (suggestions.length && total) {
      const countPages = Math.ceil(total / 8);

      return Array.from({ length: countPages }, (_, index) => index + 1);
    }

    return null;
  }, [suggestions.length, total, search]);

  const changePage = (num: number) => {
    setActivePage(num);
    document.body.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

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
                      onClick={() => {
                        setSize(el);
                        setActivePage(1);
                      }}
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
          suggestions.map((el) => (
            <ProductCard
              dataCart={dataCart}
              setRefresh={() => setRefresh(true)}
              info={el}
              key={el.id}
            />
          ))}
      </div>
      {!!(allPages && allPages.length > 1) && (
        <div className="pagination">
          {allPages.map((el) => (
            <div
              key={`page-${el}`}
              className={`numberPage ${el === activePage ? 'active' : ''}`}
              onClick={() => changePage(el)}
            >
              {el}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MainPage;
