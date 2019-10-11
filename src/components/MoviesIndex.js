import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Sidebar from './Sidebar'
import MovieCard from './MovieCard'

class MoviesIndex extends React.Component {
  constructor(){
    super()
    this.state = { 
      movies: null,

      genreCheckboxes: {},

      minRating: 0
    }

    this.genreList = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime'
      , 'Documentary'
      , 'Drama'
      , 'Family'
      , 'Fantasy'
      , 'History'
      , 'Horror'
      , 'Music'
      , 'Mystery'
      , 'Romance'
      , 'SciFi'
      , 'Thriller'
      , 'War'
      , 'Western' ]

    this.genreIds = {
      Action: 28,
      Adventure: 12,
      Animation: 16,
      Comedy: 35,
      Crime: 80,
      Documentary: 99,
      Drama: 18,
      Family: 10751,
      Fantasy: 14,
      History: 36,
      Horror: 27,
      Music: 10402,
      Mystery: 9648,
      Romance: 10749,
      SciFi: 878,
      Thriller: 53,
      War: 10752,
      Western: 37
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
      <>
        <Sidebar 
          displayFilter={true}
          genreList={this.genreList}
          handleChangeGenre={this.handleChangeGenre}
          handleChangeRadio={this.handleChangeRadio}
          handleChangeRating={this.handleChangeRating}
        />
        
        <div className="content-wrapper">
          <div className="content">
            {this.state.movies
              .filter(movie => {
                const filterGenre = this.getSelectedGenres().every((genreId => movie.genre_ids.includes(genreId)))
                const filterRating = (movie.vote_average >= this.state.minRating)
                return filterGenre && filterRating
              })
              .map((movie,i) =>
                <MovieCard movie={movie} key={i} />
              )}
          </div>
        </div>
      </>
    )
  }
}

export default MoviesIndex