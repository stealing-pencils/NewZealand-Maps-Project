import React, { Component } from 'react';
// import Drawer from '@material-ui/core/Drawer';
import './App.css';



class ResultsList extends Component {

  state = {
    visibleVenue : [],
    listOpen: false
  }


  render() {


    return (
        <div className= 'list-body'>
          <div className = "search-bar-body">
            <div className = "search-bar-content">
              <div className = "search-bar-title">
                <h2>search for your favorite venue</h2>
              </div>
              <div className = 'search-field'>
                <input
                  id="search-location-text"
                  type="search"
                  placeholder="Enter your favorite venue name"
                  value={this.state.query}
                  onChange={(event) => this.props.userQuery(event.target.value)}
                  />
              </div>

            </div>
          </div>
          <header className = 'results-header-body'>
            <div className = 'results-title'>
              <h2>Search Results</h2>
            </div>
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
