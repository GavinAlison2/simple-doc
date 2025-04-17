// import React from 'react';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };
    return (
        <form className="search-bar" onSubmit={handleChange}>
            <input
                type="search"
                name="searchTerm"
                id="searchTerm"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Enter a search term..."
                autoComplete='off'
            />
            <button type="submit" style={{ width: 90, height: 40, margin: '20px 0', }}>Search</button>
        </form>
    );
};

export default SearchBar;