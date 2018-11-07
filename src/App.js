import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';
import ResultsList from './ResultsList.js';
import './App.css';


var foursquare = require('react-foursquare')({
clientID: 'OVXN3KG3ITFHVC2XKVARXSTXTSHRLL0OVRIUQCQE53WMPOUO',
clientSecret: 'DFKG33VIWQSY5ARPP0QNYVYWPGMDDFHHWML5MUBIE4W134OM'
});


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
      bounds: {}
    }

   componentDidMount() {
        foursquare.venues.getVenues(this.state.queryLocation)
          .then(res=> {
            const {venues} = res.response
            const {center} = res.response.geocode.feature.geometry
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
            this.setState({venues, center, venuesInfo, filteredVenues: venuesInfo})
            this.addMarkers(this.state.filteredVenues)
          });
      }



    // initialize map
    mapReady = (props, map) => {
          // Save the map reference in state and prepare the location markers
          this.setState({map});
    }


    updateQuery = (query) => {
      this.setState({query});
    }

  //   toggleDrawer = () => {
  //   // Toggle the value controlling whether the drawer is displayed
  //   this.setState({
  //     open: !this.state.open
  //   });
  // }

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

    animateMarker = (marker) => {
      this.state.markers.forEach(marker => marker.setAnimation(null))
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    }
    // Opens infoWindow once marker is clicked
    onClickMarker = (marker) => {
      this.closeInfoWindow()
      this.animateMarker(marker)
      this.state.filteredVenues.forEach(info => {
        if(info.id === marker.id) {
          this.setState({bounds : new this.props.google.maps.LatLngBounds().extend(info.pos)})
          this.setState({ activeMarkerInfo : info })
        }
      })
      // updates information for infowindow
      // console.log(this.state.activeMarkerInfo)
      this.setState({ showingInfoWindow: true, activeMarker: marker })
    }

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

    toggleResults_List = () => {
      console.log("you clicked me")
    }



  render() {
    console.log(this.state.bounds)
    // console.log(this.state.activeMarker)
    // console.log(this.state.filteredVenues)

    // window.states = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <div className="header">
            <h1>Eat New Zealand</h1>
          </div>
          <div className= "button-toggle">
            <button
            // className = 'toggle-results-list'
            onClick = {this.toggleResults_List()}
            >
            Toggle
            </button>
          </div>
        </div>


        <div className= 'map-body'>
          <Map
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
          // mapCenter={this.state..pos}
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
                <br/>
              </div>
            </InfoWindow>
          </Map>
        </div>

        <div className = "list-body">
          <ResultsList
            {...this.state}
            logResultsListClick = {this.logResultsListClick}
            userQuery = {this.userQuery}
            // toggleDrawer = {this.toggleDrawer}
          />
        </div>
        <footer className="App-footer">
        </footer>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBJ39aLUnpQEi-Ewf6EIIKguFlX-z_SNbw")
})(App)
