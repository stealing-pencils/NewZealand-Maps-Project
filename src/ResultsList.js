import React, { Component } from 'react';
import './App.css';



class ResultsList extends Component {

  state = {
    visibleVenue : []
  }

  render() {


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

          {this.props.filteredVenues && this.props.filteredVenues.map((result, index) => {
             return result.address && <li
               key = {index}
               className = "list-item"

               onClick = {() => this.props.logResultsListClick(result)}
               >
               <h3 className = "venue-name">
                 {result.name}
               </h3>
               <div className = "venue-address">
                 <p>{result.formattedAddress[0]}</p>
                 <p>{result.formattedAddress[1]}</p>
               </div>
                </li>
              }
          )}
        </ol>
      </div>
    )
  }
}

export default ResultsList;
