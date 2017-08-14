import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookItem extends Component {
  
  render() {
    const { book } = this.props
    let thumbnail
    
    if (!book.imageLinks) {
      thumbnail = 'https://commons.wikimedia.org/wiki/File:No_cover.JPG'
    } else {
      thumbnail = book.imageLinks.thumbnail
    }   
    
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf}>
                <option value="none" disabled>Move to...</option>
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
    }).isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired
  })
}

export default BookItem