import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"
import './App.css'
import MainPage from './MainPage'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  
  render() { 
    return (   
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage />
        )} />
        <Route exact path='/search' render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
