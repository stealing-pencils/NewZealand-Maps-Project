import React, { Component } from 'react';
import ResultsList from './ResultsList.js';
import AppMap from './AppMap.js'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';


var foursquare = require('react-foursquare')({
clientID: 'OVXN3KG3ITFHVC2XKVARXSTXTSHRLL0OVRIUQCQE53WMPOUO',
clientSecret: 'TQTIW2FA04GLWPHBWBCK20YFKRNZ0H25PRRCTRANBZWWUTTG'
});

var params = {
"near": "Auckland, NZ",
"query": "coffee"
};


class App extends Component {

  state = {
    venues: [],
    center: [],
    markers: []
  }

  // Requests info from foursquare
    componentDidMount() {
      foursquare.venues.getVenues(params)
        .then(res=> {
          const {venues} = res.response
          const {center} = res.response.geocode.feature.geometry
          const markers = venues.map(venue => {
            return {
              name: venue.name,
              lat: venue.location.lat,
              lng: venue.location.lng,
              location: venue.location,
              isOpen: false,
              isVisible: true,
              id: venue.id,
              address: venue.location.address,
              formatted_address: venue.location.formattedAddress
            }
          })
          this.setState({venues, center, markers})
        });
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
