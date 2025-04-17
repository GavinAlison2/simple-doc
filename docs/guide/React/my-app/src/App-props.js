import React from 'react';
import MasterReact from './assets/images/masteringreact.svg';
import PracticalReact from './assets/images/practicalreact.svg';
import ReactInAction from './assets/images/reactinaction.svg';

import './assets/css/app-props.css'

const Book = ({ title, authtor, cover }) => {
    return (
        <section className="book">
            <img src={cover} alt={title} className='book-cover' />
            <h2 className='book-title'>{title}</h2>
            {/* <p className='book-author'>{authtor}</p> */}
            <span className='book-author'>{authtor}</span>
        </section>
    )
};

const AppProps = () => {
    const books = [
        { title: 'Mastering React', author: 'Anthony Pham', cover: MasterReact },
        { title: 'Practical React', author: 'Alex Johnson', cover: PracticalReact },
        { title: 'React in Action', author: 'Bob Climo', cover: ReactInAction },
    ];

    const renderedBooks = books.map((book, index) => {
        return (
            <Book key={index} {...book} />
        )
    });
    return (
        <main>
            <h1>Favorite Books</h1>
            <div className="book-list">
                {/* <Book
                    title="master react"
                    authtor="anthony pham"
                    cover={MasterReact} />
                <Book
                    title="practical react"
                    authtor="alex johnson"
                    cover={PracticalReact} />
                <Book
                    title="react in action"
                    authtor="john doe"
                    cover={ReactInAction} /> 
                    */}
                {renderedBooks}
            </div>
        </main >
    );
}
export default AppProps;