import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'

class SearchBooks extends Component {
  
  state = {
    query : '',
    searchResult : []
  }
  
  handleQuery(query) {
    this.updateQuery(query)
    this.searchQuery(query)
  }

  updateQuery(query) {
    this.setState({ query: query })
  }
  
  searchQuery(query) {
    let trimmedQuery = query.trim()
    trimmedQuery && BooksAPI.search(trimmedQuery).then( (books) => {
      this.setState({ searchResult: books })
    })
  } 
  
  render() { 
    const { query, searchResult } = this.state 
    
    let bookList;
    if (searchResult === undefined || !searchResult.length){
      bookList = null
    } else {
      bookList = <BookList books={searchResult}/>
    }
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={ event => this.handleQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {bookList}
        </div>
      </div>
    )
  } 
}

export default SearchBooks