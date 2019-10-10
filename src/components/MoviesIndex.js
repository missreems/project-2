import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
      this.state.movies.map(movie =>
        <div key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <h2 >{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
            <p>Rating: {movie.vote_average}</p>
          </Link>
        </div> 
      )
    )
  }
}

export default MoviesIndex