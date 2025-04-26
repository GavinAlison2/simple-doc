import React from 'react';
import Article from './Article';

const ArticleList = ({ articles }) => {
    // const articleList = articles.map((article) => {
    //     return <div key={article.pageid}>{article.title}</div>;
    // });

    const renderedArticles = articles.map(article => {
        return <Article key={article.pageid} article={article} />;
    });
    return (
        <div>{renderedArticles}</div>
    );
}

export default ArticleList;