import './App.css';
import wikilogo from './wikipedia-logo.png';
import SearchBar from './components/SearchBar';
import ArticleList from './components/ArticleList';
import { createContext, useState } from 'react';
import { search } from './api';

const searchTermContext = createContext('');

function App() {
  const logo = wikilogo;
  const [articles, setArticles] = useState([]);
  const [searchTermValue, setSearchTermValue] = useState('');

  const handleSearch = async (searchTerm) => {
    setSearchTermValue(searchTerm);
    if (searchTerm === '' || searchTerm === undefined) return;
    const results = await search(searchTerm);
    setArticles(results);
  }

  return (
    <>
      <header>
        <img src={logo} alt="logo" />
        <h1>My Wiki</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <searchTermContext.Provider value={searchTermValue}  >
        <main id="searchResult">
          <ArticleList articles={articles} />
        </main>
      </searchTermContext.Provider>
    </>
  );
}

export default App;
export { searchTermContext };