import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import '../src/style.scss'

import Home from './components/Home'
import MoviesIndex from './components/MoviesIndex'
import MoviesShow from './components/MoviesShow'
import Navbar from './components/Sidebar'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={MoviesIndex} />
            <Route path="/movies/:id" component={MoviesShow} />
            <Route path="/movies" component={MoviesIndex} />
          </Switch>
        </main>
      </BrowserRouter> 
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)