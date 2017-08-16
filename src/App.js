import React, { Component } from 'react'
import { Route } from "react-router-dom"
import './App.css'
import * as BooksAPI from './components/BooksAPI'
import MainPage from './components/MainPage'
import SearchPage from './components/SearchPage'

class BooksApp extends Component {
  
  state = {
    books: [],
    lookUpTable : {}
  }
  
  componentDidMount() {
    this.getBooks()
  }
  
  createLookUpTable(books) {
      var table = books.reduce((hashTable, book) => {
        hashTable[book.id] = book.shelf
        return hashTable
      }, {})
      this.setState({lookUpTable : table})
  }

  updateLocalStorage(books){
    this.createLookUpTable(books)
    this.setState({books: books})
  }

  getBooks() {
    BooksAPI.getAll()
    .then((books) => {
      this.updateLocalStorage(books)
    })
  }

  onItemChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
      this.getBooks()})
  }

  render() {
    
    const { books, lookUpTable } = this.state
    
    return (   
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage books={books} onItemChange={this.onItemChange}/>
        )} />
        <Route exact path='/search' render={() => (
          <SearchPage lookUpTable={lookUpTable} onItemChange={this.onItemChange}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
