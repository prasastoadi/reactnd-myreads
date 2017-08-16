import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookItem from './BookItem'

class BookList extends Component {

  render() {    
    const { books, onItemChange } = this.props    
    return (
      <ol className="books-grid">
        {books.map((book, index)=> (
          <li key={book.id}>
            <BookItem 
              book={book} 
              onItemChange={onItemChange}
            />
          </li>
        ))}
      </ol>
    )
  }
}

BookList.propTypes = {
  books: PropTypes.array.isRequired
}

export default BookList