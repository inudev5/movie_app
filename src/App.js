
import React from "react";
import axios from "axios";
import Movie from "./Movie.js";
import "./App.css";
class App extends React.Component{
  state = {
    isLoading: true,
    movies:[]
  };
  getMovie = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json/sort_by=rating");
    this.setState({ movies, isLoading:false});
  }
  componentDidMount() {
    this.getMovie();
  }
  render() {
   
    const { isLoading, movies} = this.state;
    return <section className="container">
      {isLoading ?
        (<div className="loader">
          <span className="loader__text">Loading....</span>
        </div>)
        : (
          <div className="movies">
            {movies.map(movie =>
            <Movie
            key={movie.id} // 리액트에서는 props에 key를 줘야함
            title={movie.title}
            id={movie.id}
            year={movie.year}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres} />)}
          </div>)}
      </section>
  }
}


export default App;
