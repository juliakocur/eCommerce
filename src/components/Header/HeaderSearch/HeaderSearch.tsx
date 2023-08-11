import './HeaderSearch.scss';

const HeaderSearch = () => {
    return (
        <div className="headerSearch">
            <form className="searchForm">
                <input 
                    type="text"
                    placeholder="Search..."
                    className="searchInput"
                />
                <img src={search} alt="search" className="searchImg" />   
            </form>
        </div>
    )
}

export default HeaderSearch;