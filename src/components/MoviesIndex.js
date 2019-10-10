import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bulma'

class MoviesIndex extends React.Component {
  constructor(){
    super()
    this.state = { 
      movies: null,

      genreCheckboxes: {
        action: false,
        comedy: false
      },

      minRating: 0,
      maxRating: 10
    }
    this.genreList = ['family', 'comedy', 'action']
    this.genreIds = {
      family: 10751,
      comedy: 35,
      action: 28
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRating = this.handleChangeRating.bind(this)
  }

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/discover/movie?page=10', {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
    })
      .then(res => this.setState( { movies: res.data.results }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
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

  render() {
    console.log(this.state)
    console.log(this.getSelectedGenres())
    if (!this.state.movies) return null
    
    
    return (
      <div>
        <p>Pick your favourite genre:</p>
        {this.genreList.map(genre => (
          <div key={genre}>
            <label>{genre}</label>
            <input name={genre} onChange={this.handleChange} type="checkbox" />
          </div>))}
        
        <p>Rating</p>
        <label>Min</label><input onChange={this.handleChangeRating} name="minRating" type="number"></input>
        <label>Max</label><input onChange={this.handleChangeRating} name="maxRating" type="number"></input>


        <hr />
        {this.state.movies
          .filter(movie => {
            const filterGenre = this.getSelectedGenres().every((genreId => movie.genre_ids.includes(genreId)))
            const filterRating = (movie.vote_average >= this.state.minRating) && (movie.vote_average <= this.state.maxRating)
            return filterGenre && filterRating
          })
          .map(movie =>

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