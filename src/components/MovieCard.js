import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const imageSize = '342'
  return (
    <div className="movieCard">
      <Link to={`/movies/${movie.id}`}>
        {/* <h2 className="title">{movie.title}</h2> */}
        <div className="image-div">
          <img src={`https://image.tmdb.org/t/p/w${imageSize}${movie.poster_path}`}></img>
        </div>
        
        {/* <h3 className="subtitle">Rating: {movie.vote_average}</h3> */}
      </Link>
    </div>
  )

}


export default MovieCard