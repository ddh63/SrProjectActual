import React, { Component } from 'react';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }

	componentDidMount() {
    fetch('/api/getAllMovies')
      .then((response) => response.json())
      .then(result => this.setState({ movies: result }));
  }

  render() {
  	let movies = this.state.movies.map((movie) => {
  		return (
  			<h3 className="movie" key={movie.id}>
 					{movie.id} {movie.title} ({movie.year})
       	</h3>
  		);
  	});

  	return (
  		<div className="movie-container">
  			{movies}
  		</div>
  	);
  }

}

export default Movies;