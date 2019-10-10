import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import MoviesIndex from './components/MoviesIndex'
import MoviesShow from './components/MoviesShow'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/movies">Index</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
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