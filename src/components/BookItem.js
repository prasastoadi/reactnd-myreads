import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookItem extends Component {

  render() {
    const { book, onItemChange } = this.props;
    var thumbnail;

    !book.imageLinks ? thumbnail = 'https://commons.wikimedia.org/wiki/File:No_cover.JPG' : thumbnail = book.imageLinks.thumbnail;
    
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => onItemChange(book, event.target.value)}>
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
    )
  }
}

BookItem.propTypes = {
  book: PropTypes.shape({
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    shelf: PropTypes.string,
    title: PropTypes.string,
    authors: PropTypes.array
  }),
  onItemChange: PropTypes.func.isRequired
};

export default BookItem;