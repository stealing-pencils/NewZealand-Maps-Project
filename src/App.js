import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import SquareAPI from './ApiIndex.js'
import ResultsList from './ResultsList.js';
import './App.css';

class App extends Component {


    state = {
      markers: [],
      map: null,
      activeMarker: {},
      activeMarkerInfo: [],
      showingInfoWindow: false,
      venues: [],
      center: [],
      venuesInfo: [],
      queryLocation: {
        "near": "Auckland, NZ",
        "query": "coffee"
      },
      query: '',
      filteredVenues: [],
      bounds: {},
      toggleList: true
    }

   componentDidMount() {
     SquareAPI.search({
       near: "Auckland, New Zealand",
       query: "coffee",
     }).then(results => {
       const { venues } = results.response;
       const { center } = results.response.geocode.feature.geometry;
       const venuesInfo = venues.map(venue => {
         if(venue.location.address) {
           return {
             name: venue.name,
             id: venue.id,
             address: venue.location.address,
             formattedAddress: venue.location.formattedAddress,
             pos: {"lat": venue.location.lat, "lng": venue.location.lng},
             visibility: true
           }
         }
         return venue
       })
       this.setState({venues, center, venuesInfo, filteredVenues : venuesInfo})
       this.addMarkers(this.state.filteredVenues)
     })
   }


    // initialize map
    mapReady = (props, map) => {
          // Save the map reference in state and prepare the location markers
          this.setState({map});
    }


    updateQuery = (query) => {
      this.setState({query});
    }

    // filters venues that match user input and matches them to marker
    userQuery = (query) => {
        let matchingVenues = this.state.venuesInfo.filter(venue => {
          const queryMatch = venue.name.toLowerCase().includes(query.toLowerCase())
          const userVenues = this.state.markers.find(marker => marker.id === venue.id)

          userVenues.setMap(null)
          userVenues.visibility = false

          if(queryMatch){
            userVenues.setMap(this.state.map)
            userVenues.visiblity = true
          }
          return queryMatch
        })

        this.setState({
        filteredVenues : matchingVenues,
        query : query })
      }

    // // Takes details of click from ResultsList component
    logResultsListClick = (result) => {
       // maps over markers to find the correct marker
       this.state.markers.forEach((marker => {
         if(marker.id === result.id) {
           // then matches up the venue info to update the infowindow
           this.state.filteredVenues.forEach(info => {
             if(info.id === marker.id) {
               this.closeInfoWindow()

               this.setState({ activeMarkerInfo: info,
                 showingInfoWindow: true,
                 activeMarker: marker})
                 this.animateMarker(marker)

             }
           })
         }
       }))
    }

    // If any marker infowindows are open this will close them all
    closeInfoWindow = () => {
      this.state.activeMarker &&
      this.setState({ showingInfoWindow: false, activeMarker: null})
    }

    // calls for extra venue details using FourSquare
    getVenueDetails = (marker) => {
      const venue = this.state.filteredVenues.find(venue => venue.id === marker.id)
      SquareAPI.getVenueDetails(marker.id).then(res => {
        const newVenue = Object.assign(res.response.venue, venue);
        this.setState({ activeMarkerInfo : Object.assign(this.state.filteredVenues, newVenue)})
      })
    }
    // clears all marker animation before setting animation for active marker
    animateMarker = (marker) => {
      this.getVenueDetails(marker)
      this.state.markers.forEach(marker => marker.setAnimation(null))
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    }
    // Opens infoWindow once marker is clicked
    onClickMarker = (marker) => {
      this.closeInfoWindow()
      this.animateMarker(marker)

      this.state.filteredVenues.forEach(info => {

        if(info.id === marker.id) {
          // this.setState({bounds : new this.props.google.maps.LatLngBounds().extend(info.pos)})
          this.setState({ activeMarkerInfo : info })
        }
      })
      // updates information for infowindow
      this.setState({ showingInfoWindow: true, activeMarker: marker })
    }

    // function to add all markers to map
    addMarkers = (venuesInfo) => {
      // check there are values coming from venuesInfo props
      if(!venuesInfo) {
        return console.log("no venue info")
      }
      // removes any markers on the page
      this.state.markers.forEach(marker => marker.setMap(null))
      // maps over markervenues to create instances for each marker and
      // separating them into an array which can be saved in the markers state
      let markers = venuesInfo.map((info, index) => {
        // create marker using google maps react
        let marker = new this.props.google.maps.Marker({
          position: info.pos,
          map: this.state.map,
          animation: this.props.google.maps.Animation.DROP,
          id: info.id
        })
        marker.addListener('click', () => {
          this.onClickMarker(marker)
        })
        return marker
      })
      this.setState({markers})
    }

    render() {
      // checks that props are loaded and returns error message if they're not
      !this.props.loaded &&
      setTimeout(()=> {
        return <div>Map failed to load, please check your
        internet connection and try again</div>
      }, 1001)

    return (
      <div className="App">
        <div className="App-header">
          <header>
            <h1 tabindex="0">Coffee Cup, New Zealand</h1>
          </header>
        </div>
        <div className = "list-body">
          <ResultsList
            {...this.state}
            logResultsListClick = {this.logResultsListClick}
            userQuery = {this.userQuery}
            />
        </div>  
        <div
          className="map-body">
          <Map
          tabindex="0"
          role="application"
          aria-label="map"
          onReady = {this.mapReady}
          google={this.props.google}
          style={{width: '100%', height: '100%'}}
          className={'map'}
          zoom={13}
          bounds={this.bounds}
          initialCenter={{
            lat: -36.848461,
            lng: 174.763336
          }}
          onClick = {this.closeInfoWindow}
          >
            <InfoWindow
              marker = {this.state.activeMarker}
              visible = {this.state.showingInfoWindow}
              onClose = {this.closeInfoWindow}
            >
              <div className="infoWindow-content">
                <h2>{this.state.activeMarkerInfo.name}</h2>
                <div className="location-details">
                  <strong>Address:</strong>
                  <p>{this.state.activeMarkerInfo.address}</p>
                </div>
                <div className="venue-url">
                  {this.state.activeMarkerInfo.url &&
                    <p>{this.state.activeMarkerInfo.url}</p>
                  }
                </div>
                <div className="Foursquare-attribute">
                  <p>Venue information provided by foursquare.com</p>
                </div>
                <br/>
              </div>
            </InfoWindow>
          </Map>
        </div>
        <footer
        className="App-footer"
        tabindex="0">
        </footer>
      </div>
    );
  }
}

export default GoogleApiWrapper({
   apiKey: ("AIzaSyBJ39aLUnpQEi-Ewf6EIIKguFlX-z_SNbw")
 })(App)
