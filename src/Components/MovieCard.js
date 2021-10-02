import React, { Component } from "react";
import { MdStar, MdDateRange, MdAccessTime } from "react-icons/md";

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getYear(date) {
    return new Date(date).getFullYear();
  }

  render() {
    return (
      <div class="card-container">
        <div>
          <img class="movie-img" src={this.props.movies.poster} alt={this.props.movies.slug} />
        </div>
        <div className="card-content">
          <div className="mt-2 movie-name">{this.props.movies.title}</div>

          <div className="mt-2 flex align-center flex-row">
            <div class="flex align-center flex-row">
              <MdStar size="18" color="orange" />
              <div className="rating">{this.props.movies.imdb_rating}</div>
            </div>
            <div class="flex align-center flex-row pl-2">
              <MdDateRange size="18" color="orange" />
              <div className="rating">
                {this.getYear(this.props.movies.released_on)}
              </div>
            </div>
            <div class="flex align-center flex-row pl-2">
              <MdAccessTime size="18" color="orange" />
              <div className="rating">{this.props.movies.length}</div>
            </div>
            <div class="flex align-center flex-row pl-2">
              <div className="classification">
                {this.props.movies.classification}
              </div>
            </div>
          </div>
          <div className="mt-1 movie-description">
            {this.props.movies.overview}
          </div>
          <div class="flex align-center flex-row">
            <div>
              <span className="text-bold">Cast</span>
              <div class="cast flex flex-row ml-2 mt-1">
                {this.props.movies.cast.length > 0 &&
                  this.props.movies.cast.map((cast, i) => {
                    return (
                      <span>
                        {i !== 0 && <span>, </span>}
                        {cast}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
          <div class="flex align-center flex-row mt-2">
            <div>
              <span className="text-bold">genres</span>
              <div class="cast flex flex-row ml-2 mt-1">
                {this.props.movies.genres.length > 0 &&
                  this.props.movies.genres.map((genres, i) => {
                    return (
                      <span>
                        {i !== 0 && <span>, </span>}
                        {genres}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
          <div class="flex align-center flex-row mt-2">
            <div>
              <span className="text-bold">
                {Array.isArray(this.props.movies.director)
                  ? "Directors"
                  : "Director"}
              </span>
              <div class="cast flex flex-row ml-2 mt-1">
                {!Array.isArray(this.props.movies.director) && (
                  <span>{this.props.movies.director}</span>
                )}
                {Array.isArray(this.props.movies.director) &&
                  this.props.movies.director.length > 0 &&
                  this.props.movies.director.map((director, i) => {
                    return (
                      <span>
                        {i !== 0 && <span>, </span>}
                        {director}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
