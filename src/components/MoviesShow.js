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
    const backgroundStyle = {
      backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
      backgroundSize: 'cover'
    }
    const genres = movie.genres

    // console.log(genres)
    return (
      <div className="movie-show-wrapper" style={backgroundStyle}>
        <div className="movie-show" key={movie.id}>
          <div className="primary-info">
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}></img>
            <div className="movie-text">
              <div className="primary-text">
                <h2>{movie.title}</h2>
                <h4>{movie.tagline}</h4>
                <h5>Rating: {movie.vote_average} ({movie.vote_count} votes)</h5>
              </div>

              <div className="secondary-text">
                {movie.status !== 'Released' && <p>Status: {movie.status}</p>}
                <p>Duration: {movie.runtime} mins</p>
                <p>Overview: {movie.overview}</p>
                <p>Language(s):</p>
                {movie.spoken_languages.map(language => (<p key={language.name}>{language.name}</p>))}
                {genres.map((genre, i) => (<button key={i}>{genre.name}</button>))}
              </div>

            </div>            
          </div>

        </div> 
      </div>
    )
  }
}

export default MoviesShow