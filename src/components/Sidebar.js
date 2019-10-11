import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ displayFilter, genreList, handleChangeGenre, handleChangeRadio, handleChangeRating }) => (
  <div className="sidebar">
    <div className="sidebar-wrapper">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Index</Link>
      </nav>
      {displayFilter && 
        <div className='filters'> 
          <h2>FILTERS</h2>

          <div className="rating">
            <label>Min Rating</label>
            <input onChange={handleChangeRating} name="minRating" type="number" />
          </div>
          
          <div className="radio">
            <div><label>Popularity</label><input onChange={handleChangeRadio} name="sortMovies" value="popularity" type="radio" /></div>
            <div><label>Newest</label><input onChange={handleChangeRadio} name="sortMovies" value="newest" type="radio" /></div>
          </div>

          <div className="checkboxes">
            {genreList.map(genre => (
              <div key={genre}>
                <label>{genre}</label>
                <input name={genre} onChange={handleChangeGenre} type="checkbox" />
              </div>))}
          </div>
          
          
        </div>
      }

    </div>
    

  </div>
)

export default Sidebar