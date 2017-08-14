import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList'

class BookShelf extends Component {
  
  render() {
    const { books, shelf } = this.props
    const shelfTitle = {'currentlyReading': 'Currently Reading',
                      'wantToRead': 'Want to Read',
                      'read': 'read'}
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle[shelf]}</h2>
        <div className="bookshelf-books">
          <BookList 
            books={ books.filter(book => (
              book.shelf == shelf
            ))}
          />
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired
}

export default BookShelf