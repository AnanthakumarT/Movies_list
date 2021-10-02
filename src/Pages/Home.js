import React, { Component } from "react";
import Header from "../Components/Header";
import MovieCard from "../Components/MovieCard";
import { getMovies } from "../Services/Services";
import { LoadingOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { MdSentimentDissatisfied } from "react-icons/md";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [1, 2, 34, 4, 5, 34, 34, 34, 34],
      generes: [],
      moviesList: [],
      isPageLoading: true,
      text: "",
      isSearched: false,
      searchedMovies: [],
    };
  }

  async componentDidMount() {
    this.getMoviesList();
  }

  getMoviesList = async () => {
    const users = await getMovies();
    let list = [];
    users.movies.forEach((user) => {
      list.push(...user.genres);
    });
    this.setState({
      generes: [...new Set(list)],
      moviesList: users.movies,
      isPageLoading: false,
    });
  };

  getText = async (text) => {
    await this.setState({ isPageLoading: true, text: text, isSearched: true });
    let temp = [];
    if (this.state.text) {
      this.state.moviesList.forEach((item) => {
        if (item.title.includes(text)) {
          temp.push(item);
        }
      });
    } else if (!this.state.text) {
      this.setState({ isSearched: false });
      this.getMoviesList();
    }
    await this.setState({ searchedMovies: temp, isPageLoading: false });
  };
  render() {
    return (
      <div>
        <Header getText={this.getText} />
        <div class="mt-header px-20">
          <div class="pt-10 body-content">
            <div>
              {this.state.isPageLoading ? (
                <div class="flex justify-center pt-10">
                  <LoadingOutlined
                    style={{ fontSize: 44, color: "#00d100" }}
                    spin
                  />
                </div>
              ) : (
                <div>
                  {!this.state.isSearched &&
                    !this.state.isPageLoading &&
                    this.state.generes.length > 0 &&
                    this.state.generes.map((generes, i) => {
                      return (
                        <div key={i}>
                          <div class="genere-text">{generes}</div>
                          <div class="mt-2 flex flex-row scroll">
                            {this.state.moviesList.length > 0 &&
                              // eslint-disable-next-line array-callback-return
                              this.state.moviesList.map((item) => {
                                if (item.genres.includes(generes)) {
                                  return (
                                    <div key={item.id}>
                                      <MovieCard movies={item} />
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div class="mt-2 flex flex-row flex-wrap">
              {this.state.isSearched &&
                !this.state.isPageLoading &&
                this.state.searchedMovies.length > 0 &&
                this.state.searchedMovies.map((movie) => {
                  return (
                    <div class="mt-2 flex flex-row flex-wrap" key={movie.id}>
                      <MovieCard movies={movie} />
                    </div>
                  );
                })}
            </div>
            <div>
              {((!this.state.isPageLoading &&
                this.state.moviesList.length === 0) ||
                (this.state.isSearched &&
                  this.state.searchedMovies.length === 0)) && (
                <div className="pt-10 flex justify-center align-center flex-column">
                  <div>
                    <MdSentimentDissatisfied size="140" color="gray" />
                  </div>
                  <div className="no-movies pt-10">No Movies found!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
