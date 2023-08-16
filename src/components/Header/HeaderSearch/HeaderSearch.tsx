import './HeaderSearch.scss';
import search from '../../../shared/assets/icons/search.svg';

const HeaderSearch = () => {
  return (
    <div className="headerSearch">
      <form className="searchForm">
        <input type="text" placeholder="Search..." className="searchInput" />
        <img src={search} alt="search" className="searchImg" />
      </form>
    </div>
  );
};

export default HeaderSearch;
