import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bulma'

class MoviesIndex extends React.Component {
  constructor(){
    super()
    this.state = { movies: null }
  }

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/discover/movie?page=2', {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
    })
      .then(res => this.setState( { movies: res.data.results }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    if (!this.state.movies) return null
    return (
      <div>
        <p>Pick your favourite genre:</p>
        <label>Action</label>
        <input type="checkbox" />

        <label>Comedy</label>
        <input type="checkbox" />

        <hr />
        {this.state.movies.map(movie =>

          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div>
              <h2 className="title">{movie.title}</h2>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
              <h3 className="subtitle">Rating: {movie.vote_average}</h3>
            </div>
            <hr />
          </Link>
        )}

      </div>
    )
  }
}

export default MoviesIndex