import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class MainPage extends Component{
  state = {
    books: []
  }
  
  componentDidMount() {
    this.getBooks()
  }
  
  getBooks() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({books: books})
    })
  }

  onItemChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(this.getBooks())
  }

  render(){
    const { books } = this.state  
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
              onItemChange={this.onItemChange}
            />
            <BookShelf 
              books={books} 
              shelf={'wantToRead'} 
              onItemChange={this.onItemChange}
            />
            <BookShelf 
              books={books} 
              shelf={'read'} 
              onItemChange={this.onItemChange}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MainPage