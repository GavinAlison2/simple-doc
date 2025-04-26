import React from 'react';
import { useContext } from 'react';
import { stripHtml } from '../util.js';
import { searchTermContext } from '../App.js';
import { Parser } from 'html-to-react';
import '../App.css';


const Article = ({ article }) => {
    let searchTerm = useContext(searchTermContext);
    const url = `https://en.wikipedia.org/?curid=${article.pageid}`;
    const title = stripHtml(article.title);
    const snippet = stripHtml(article.snippet, searchTerm);
    // const htmlString = '<p>这是一个 <strong>加粗</strong> 的段落。</p>';
    const parser = new Parser();
    // const reactElements = parser.parse(htmlString);
    // const pEle = <p>这是一个 <strong>加粗</strong> 的段落。</p>;
    const renderSnippet = parser.parse(snippet);
    return (
        <article>
            <a href={url} title={title}>
                <h2>{title}</h2>
            </a>
            {/* <div className="summary">{snippet}...</div> */}
            <div className="summary">{renderSnippet}...</div>
        </article>
    );
};

export default Article;