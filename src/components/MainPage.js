import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class MainPage extends Component{

  render(){
    const { books, onItemChange } = this.props;
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf 
              books={books} 
              shelf={'currentlyReading'} 
              onItemChange={onItemChange}
            />
            <BookShelf 
              books={books} 
              shelf={'wantToRead'} 
              onItemChange={onItemChange}
            />
            <BookShelf 
              books={books} 
              shelf={'read'} 
              onItemChange={onItemChange}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

MainPage.propTypes = {
  books: PropTypes.array.isRequired,
  onItemChange: PropTypes.func.isRequired
};

export default MainPage;