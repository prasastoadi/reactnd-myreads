import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'

class BooksApp extends Component {
  state = {
    books: []
  }
  
  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({books: books})
    })
  }
  
  render() {
    const { books } = this.state   
    return (   
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={books} shelf={'currentlyReading'}/>
                <BookShelf books={books} shelf={'wantToRead'}/>
                <BookShelf books={books} shelf={'read'}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
