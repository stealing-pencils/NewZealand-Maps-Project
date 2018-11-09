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
      <article>
        <div className= 'list-body'>
        <section>
            <div className = "search-bar-body">
              <div className = "search-bar-content">
                <div className = "search-bar-title">
                  <h2>
                  search for your favorite venue
                  </h2>
                </div>
                <div className ="search-field">
                  <input
                    tabindex="0"
                    id="search-location-text"
                    type="search"
                    placeholder="Enter your favorite venue name"
                    value={this.state.query}
                    onChange={(event) => this.props.userQuery(event.target.value)}
                    />
                </div>
              </div>
            </div>
          </section>
          <section>
            <header className = 'results-header-body'>
              <div className = 'results-title'>
                <h2>
                Search Results
                </h2>
              </div>
            </header>
            <ol className = "search-results-body">
              {this.props.filteredVenues && this.props.filteredVenues.map((result, index) => {
                 return result.address && <li
                     key = {index}
                     className = "list-item"
                     tabindex="0"
                     aria-label="button accesses corresponding marker on the map"
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
          </section>
      </div>
    </article>
    )
  }
}

export default ResultsList;
