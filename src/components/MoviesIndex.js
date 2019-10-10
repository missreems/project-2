import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bulma'

class MoviesIndex extends React.Component {
  constructor(){
    super()
    this.state = { 
      movies: null,

      genreCheckboxes: {},

      minRating: 0,
      maxRating: 10
    }

    this.genreList = ['family', 'comedy', 'action']

    this.genreIds = {
      family: 10751,
      comedy: 35,
      action: 28
    }

    this.handleChangeGenre = this.handleChangeGenre.bind(this)
    this.handleChangeRating = this.handleChangeRating.bind(this)
    this.handleChangeRadio = this.handleChangeRadio.bind(this)
  }

  componentDidMount() {
    let allMovies = []
    for (let i = 0; i < 10; i++){
      axios.get(`https://api.themoviedb.org/3/discover/movie?page=${i + 1}`, {
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
      })
        .then(res => {
          allMovies = allMovies.concat(res.data.results)
          // if (res.data.results.some(result => result.title === 'The Princess Diaries')) console.log('oh shit', i + 1)
          if (i === 9) this.setState({ movies: allMovies })
        })
        .catch(err => console.log(err))
    }

  }

  // FUNCTIONS
  handleChangeGenre(e) {
    this.setState({ genreCheckboxes: { ...this.state.genreCheckboxes, [e.target.name]: e.target.checked } })
  }

  handleChangeRating(e) {
    this.setState({ [e.target.name]: Number(e.target.value) })
  }

  getSelectedGenres() {
    const { genreCheckboxes } = this.state
    return this.genreList.reduce((includedIds, genre) => {
      if (genreCheckboxes[genre]) includedIds.push(this.genreIds[genre])
      return includedIds
    }, [])
  }

  handleChangeRadio(e) {
    if (e.target.value === 'popularity'){
      this.setState( { movies: this.sortingPopularity(this.state.movies) } )
    } else if (e.target.value === 'newest'){
      this.setState( { movies: this.sortingDates(this.state.movies) } )
    }
  }

  sortingPopularity(array) {
    return array.sort((a,b) => b.popularity - a.popularity)
  }

  sortingDates(array) {
    return array.sort((a,b) => new Date(b.release_date) - new Date(a.release_date))
  }

  // RENDERING
  render() {
    console.log(this.state)
    if (!this.state.movies) return null
    // this.state.movies.forEach(movie => console.log(movie.popularity))
    // this.state.movies.forEach(movie => console.log(movie.release_date))
    return (
      <div>
        <p>Pick your favourite genre:</p>
        {this.genreList.map(genre => (
          <div key={genre}>
            <label>{genre}</label>
            <input name={genre} onChange={this.handleChangeGenre} type="checkbox" />
          </div>))}
        <p>Rating</p>
        <label>Min</label><input onChange={this.handleChangeRating} name="minRating" type="number" />
        <label>Max</label><input onChange={this.handleChangeRating} name="maxRating" type="number" />
        <label>Popularity</label><input onChange={this.handleChangeRadio} name="sortMovies" value="popularity" type="radio" />
        <label>Newest</label><input onChange={this.handleChangeRadio} name="sortMovies" value="newest" type="radio" />
        <hr />
        {this.state.movies
          .filter(movie => {
            const filterGenre = this.getSelectedGenres().every((genreId => movie.genre_ids.includes(genreId)))
            const filterRating = (movie.vote_average >= this.state.minRating) && (movie.vote_average <= this.state.maxRating)
            return filterGenre && filterRating
          })
          .map((movie,i) =>
            <Link to={`/movies/${movie.id}`} key={i}>
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