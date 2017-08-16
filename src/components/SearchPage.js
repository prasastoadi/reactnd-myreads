import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'

class SearchPage extends Component {
  
  state = {
    query : '',
    lookUpTable: {},
    searchResult : []
  }

  componentDidMount() {
    this.setState({lookUpTable: this.props.lookUpTable})   
  }  
  
  findBookIdInShelf(book) {
    if (this.props.lookUpTable.hasOwnProperty(book.id)){
      return this.props.lookUpTable[book.id]
    } else {
      return false
    }
  }

  setResultShelf(bookResult) {
    var books = bookResult
    for (var idx=0; idx < books.length; idx++) {
      if(this.findBookIdInShelf(books[idx])){
        books[idx].shelf = this.props.lookUpTable[books[idx].id]
      } else {
        books[idx].shelf = 'none'
      }      
    }
    this.setState({searchResult: books})
  }

  setShelf(book, shelf) {
    var searchResult = this.state.searchResult.slice()
    for (var idx=0; idx < searchResult.length; idx++){
      if (searchResult[idx] === book){
        searchResult[idx].shelf = shelf
      }
    }
    this.setState({searchResult: searchResult})
  }

        
  handleQuery(query) {
    this.updateQuery(query)
    this.searchQuery(query)
  }

  updateQuery(query) {
    this.setState({ query: query })
  }
  
  searchQuery(query) {
    var trimmedQuery = query.trim()
    trimmedQuery && BooksAPI.search(trimmedQuery).then( (books) => {
      this.setState({ searchResult: books })
      this.setResultShelf(books)
    })
  } 

  onItemChange = (book, shelf) => {
    this.props.onItemChange(book, shelf)
    this.setShelf(book, shelf)
  }
  
  render() { 
    const { query, searchResult } = this.state 
    var bookList;
    if (searchResult === undefined || !searchResult.length){
      bookList = null
    } else {
      bookList = <BookList books={searchResult} onItemChange={this.onItemChange}/>
    }
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput 
              type="text"
              placeholder="Search by title or author"
              value={query}
              debounceTimeout={500}
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

export default SearchPage