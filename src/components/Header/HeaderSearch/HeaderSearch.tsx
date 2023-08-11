import './HeaderSearch.scss';
import search from '../../../shared/assets/icons/search.svg';
import React, { useState } from 'react';

const HeaderSearch = () => {
    const [value, setValue] = useState('');
    console.log(value);
    return (
        <div className="headerSearch">
            <form className="searchForm">
                <input 
                    type="text"
                    placeholder="Search..."
                    className="searchInput"
                    onChange={(event) => setValue(event.target.value)}
                />
                <img src={search} alt="search" className="searchImg" />   
            </form>
        </div>
    )
}

export default HeaderSearch;
