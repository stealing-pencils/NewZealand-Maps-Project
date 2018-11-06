import React, { Component } from 'react';
import './App.css';



class ResultsList extends Component {

  state = {
    visibleVenue : []
  }

//   checkFilteredVenues = () => {
//
//     this.props.filteredVenues.forEach(venue => {
//       if(venue.visibility === true ){
//
//         this.setState({ visbileVenue : venue })
//         console.log(this.state.visibleVenue + "hello")
//       }
//   })
// }




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
                   <p>{result.name}</p>
                  </li>

                }

        )}

        </ol>
      </div>
    )
  }
}

export default ResultsList;
