import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ResultsList from './ResultsList.js';
import AppMap from './AppMap.js'
import './App.css';


class App extends Component {

  state = {
    venues: [],
    center: [],
    venuesInfo: [],
    queryLocation: {
      "near": "Auckland, NZ",
      "query": "coffee"
    }
  }

  render() {

    return (
      <div className="App">

        <header className="App-header">
          Eat New Zealand
        </header>
        <div className = "search-bar-body">
          <div className = "search-bar-title">
            <h2>find what you fancy</h2>
          </div>
          <div className = 'search-field'>
            <input
              id="search-location-text"
              type="search"
              placeholder="Enter your favorite area!"
              // value={this.state.query}
              // onChange={(event) => this.updateQuery(event.target.value)}
              />
            <input id="search-location-button" type="button" value="Zoom"/>
          </div>
        </div>

        <div className= 'map-body'>
          <AppMap
          {...this.state}
          venuesInfo = {this.state.venuesInfo}
          />
        </div>

        <div className = "list-body">
          <ResultsList

          />
        </div>
        <footer className="App-footer">
        </footer>
      </div>
    );
  }
}


export default App;
