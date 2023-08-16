import './HeaderSearch.scss';
import search from '../../../shared/assets/icons/search.svg';

const HeaderSearch = () => {
  return (
    <div className="searchForm">
      <input type="text" placeholder="Search..." className="searchInput" />
      <img src={search} alt="search" className="searchImg" />
    </div>
  );
};

export default HeaderSearch;
