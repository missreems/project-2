import React from 'react'
import axios from 'axios'

class MoviesShow extends React.Component {
  constructor () {
    super()
    this.state = { movie: null, bottle: null }
  }
  componentDidMount() {
    const movieId = this.props.match.params.id
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err))
  }
  render() {
    if (!this.state.movie) return null
    const { movie } = this.state

    const genres = movie.genres

    console.log(genres)
    return (
      <div key={movie.id}>
        <h2 >{movie.title}</h2>

        {movie.status !== 'Released' && <p>Status: {movie.status}</p>}

        <p>Duration: {movie.runtime} mins</p>

        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>

        <h4>{movie.tagline}</h4>

        <p>Overview: {movie.overview}</p>

        <h4>Rating: {movie.vote_average} ({movie.vote_count} votes)</h4>

        <p>Language(s):</p>
        {movie.spoken_languages.map(language => (<p key={language.name}>{language.name}</p>))}

        {genres.map((genre, i) => (<button key={i}>{genre.name}</button>))}
      </div> 
    )
  }
}

export default MoviesShow