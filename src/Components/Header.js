import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };
  }

  handleInput = async (value) => {
    await this.setState({ searchQuery: value });
    this.props.getText(this.state.searchQuery);
  };

  render() {
    return (
      <div class="header">
        <div class="flex flex-row justify-between align-center h-100 px-20">
          <div class="text-bold text-2rem green-text">
            WOOKIE <br />
            MOVIES
          </div>
          <div class="flex flex-row">
            <div>
              <input
                class="input"
                id="searchQuery"
                placeholder="Search"
                value={this.state.searchQuery}
                onChange={(e) => this.handleInput(e.target.value)}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
