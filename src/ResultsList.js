import React, { Component } from 'react';
import './App.css';



class ResultsList extends Component {


  render() {

    // console.log(this.props.filteredVenues)

    return (
      <div className= 'list-body'>
        <header className = 'results-header-body'>
          <div className = 'results-title'>
            <h2>Search Results</h2>
          </div>
          <button className = 'close-results-list'>
          </button>
        </header>
        <ol className = "search-results-body">
          {this.props.venuesInfo && this.props.venuesInfo.map((result, index) => (

            <li
            key = {index}
            className = "list-item"
            onClick = {() => this.props.logResultsListClick(result)}
            >
              <p>{result.name}</p>
            </li>
          )
        )}
        </ol>
      </div>
    )
  }
}

export default ResultsList;
